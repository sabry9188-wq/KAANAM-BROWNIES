/**
 * KAANAM BROWNIES — image pipeline
 * ---------------------------------------------------------------------------
 * Reads the full-size photographs in  source-images/
 * and writes web-optimised versions into  public/images/
 *
 * Run it with:   npm run images
 *
 * TO REPLACE A PHOTO: drop your new picture into source-images/ using the
 * exact `from` filename listed below (any common format works — jpg, png,
 * webp, heic), then run `npm run images` again. Nothing else needs changing.
 *
 * If a source file is missing the script simply skips it and keeps going, so
 * you can replace photos one at a time.
 * ---------------------------------------------------------------------------
 */

import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "source-images");
const OUT = path.join(ROOT, "public", "images");
const APP = path.join(ROOT, "app");

/** Standard sizes used across the site. */
const CARD = { width: 900, height: 1125 }; // 4:5 portrait — product cards
const WIDE = { width: 1920, height: 1080 }; // 16:9 — hero
const FEATURE = { width: 1200, height: 1500 }; // 4:5 — featured product
const TILE = { width: 900, height: 900 }; // 1:1 — gallery
const TILE_WIDE = { width: 1400, height: 900 }; // gallery wide tile
const TILE_TALL = { width: 900, height: 1350 }; // gallery tall tile

/**
 * `position` controls which part of a photo survives the crop.
 * Use sharp.strategy.attention to let sharp pick the most detailed region,
 * or a compass string ("top", "north", "centre", …) to force it.
 */
const ATTENTION = sharp.strategy.attention;

const JOBS = [
  // ---- Product cards (referenced from data/products.ts) --------------------
  { from: "brownie cookies 1.jpg", to: "brownie-cookies.webp", ...CARD, position: ATTENTION },
  // "bottom" keeps the sharp brownie in frame instead of the blurred backdrop.
  { from: "nuts brownie 1.jpg", to: "nuts-brownie.webp", ...CARD, position: "bottom" },
  { from: "fudge brownie 1.jpg", to: "fudge-brownie.webp", ...CARD, position: ATTENTION },
  { from: "blondie 1.jpg", to: "blondie.webp", ...CARD, position: ATTENTION },
  { from: "chocolate overload 1.jpg", to: "chocolate-overload.webp", ...CARD, position: ATTENTION },

  // ---- Hero / featured / about --------------------------------------------
  { from: "fudge brownie 2.jpg", to: "hero.webp", ...WIDE, position: ATTENTION, quality: 78 },
  { from: "chocolate overload 2.jpg", to: "featured.webp", ...FEATURE, position: ATTENTION },
  { from: "brownie drizzle.jpg", to: "about.webp", ...FEATURE, position: ATTENTION },
  { from: "fudge brownie 2.jpg", to: "cta-band.webp", width: 1600, height: 700, position: ATTENTION, quality: 70 },

  // ---- Gallery -------------------------------------------------------------
  { from: "nuts brownie 2.jpg", to: "gallery-nuts-slab.webp", ...TILE_WIDE, position: ATTENTION },
  { from: "brownie cookies 2.jpg", to: "gallery-cookie-stack.webp", ...TILE_TALL, position: ATTENTION },
  // Displayed as a wide tile, so it is cropped wide here rather than by CSS.
  { from: "brownie tray.jpg", to: "gallery-brownie-tray.webp", ...TILE_WIDE, position: ATTENTION },
  { from: "blondie 2.jpg", to: "gallery-blondie.webp", ...TILE, position: ATTENTION },
  { from: "chocolate overload 1.jpg", to: "gallery-pour.webp", ...TILE_TALL, position: ATTENTION },
  { from: "fudge brownie 1.jpg", to: "gallery-ganache.webp", ...TILE, position: ATTENTION },

  // ---- Social preview card -------------------------------------------------
  { from: "fudge brownie 2.jpg", to: "og-image.jpg", width: 1200, height: 630, position: ATTENTION, format: "jpeg" },
];

/**
 * Crops taken from the poster (source-images/poster.jpg, 1280x853).
 * `extract` is an exact pixel box: { left, top, width, height }.
 *
 * NOTE: brookies.webp is cut from a small area of the poster, so it is softer
 * than the photographed products. Replace it first — put a real photo at
 * source-images/brookies.jpg and add it to JOBS above (or drop a finished
 * image straight into public/images/brookies.webp).
 */
const POSTER_JOBS = [
  {
    to: "brookies.webp",
    extract: { left: 1040, top: 528, width: 218, height: 218 },
    ...CARD,
    sharpen: true,
  },
  // Full gold lockup: crest + KAANAM + BROWNIES. The site typesets its own
  // wordmark, so this one is for you — a WhatsApp Business or social avatar.
  {
    to: "logo.png",
    extract: { left: 50, top: 6, width: 320, height: 212 },
    width: 640,
    format: "png",
  },
  // Crest only (crescent + brownie stack). Used in the header and as the favicon.
  {
    to: "logo-mark.png",
    extract: { left: 136, top: 12, width: 120, height: 118 },
    width: 480,
    format: "png",
  },
];

/** Pixel box on the poster for the crest, reused by the favicon builder. */
const CREST = { left: 136, top: 12, width: 120, height: 118 };

async function ensureDirs() {
  await mkdir(OUT, { recursive: true });
}

/** Finds a source file by name, ignoring the extension so any format works. */
async function findSource(name, listing) {
  const direct = path.join(SRC, name);
  if (existsSync(direct)) return direct;
  const base = name.replace(/\.[^.]+$/, "").toLowerCase();
  const match = listing.find((f) => f.replace(/\.[^.]+$/, "").toLowerCase() === base);
  return match ? path.join(SRC, match) : null;
}

async function runJob(job, listing) {
  const source = await findSource(job.from, listing);
  if (!source) {
    console.warn(`  skip   ${job.to.padEnd(30)} (missing source: ${job.from})`);
    return false;
  }

  let pipe = sharp(source, { failOn: "none" }).rotate();

  pipe = pipe.resize({
    width: job.width,
    height: job.height,
    fit: "cover",
    position: job.position ?? "centre",
    withoutEnlargement: false,
  });

  const target = path.join(OUT, job.to);
  if (job.format === "jpeg") {
    pipe = pipe.jpeg({ quality: job.quality ?? 82, mozjpeg: true });
  } else {
    pipe = pipe.webp({ quality: job.quality ?? 80, effort: 5 });
  }

  const info = await pipe.toFile(target);
  console.log(`  write  ${job.to.padEnd(30)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  return true;
}

async function runPosterJob(job, posterPath) {
  let pipe = sharp(posterPath).extract(job.extract);

  if (job.width) {
    pipe = pipe.resize({
      width: job.width,
      height: job.height,
      fit: job.height ? "cover" : "inside",
      kernel: "lanczos3",
    });
  }
  if (job.sharpen) pipe = pipe.sharpen({ sigma: 1.1, m1: 0.6, m2: 0.4 });

  const target = path.join(OUT, job.to);
  if (job.format === "png") {
    pipe = pipe.png({ compressionLevel: 9, palette: true, quality: 92 });
  } else {
    pipe = pipe.webp({ quality: 88, effort: 6 });
  }

  const info = await pipe.toFile(target);
  console.log(`  write  ${job.to.padEnd(30)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

/** Favicons: Next.js serves app/icon.png and app/apple-icon.png automatically. */
async function buildIcons(posterPath) {
  const mark = sharp(posterPath).extract(CREST);

  const bg = { r: 20, g: 9, b: 6, alpha: 1 };

  for (const [file, size] of [
    ["icon.png", 512],
    ["apple-icon.png", 180],
  ]) {
    const info = await mark
      .clone()
      .resize(size, size, { fit: "contain", background: bg })
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(path.join(APP, file));
    console.log(
      `  write  app/${file.padEnd(26)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
    );
  }
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`source-images/ not found at ${SRC}`);
    process.exit(1);
  }
  await ensureDirs();
  const listing = await readdir(SRC);

  console.log("\nKaanam Brownies — optimising images\n");

  let written = 0;
  for (const job of JOBS) {
    if (await runJob(job, listing)) written += 1;
  }

  const posterPath = await findSource("poster.jpg", listing);
  if (posterPath) {
    for (const job of POSTER_JOBS) {
      // Don't overwrite a real photo the owner has supplied.
      const supplied = await findSource(job.to.replace(/\.webp$/, ".jpg"), listing);
      if (job.to === "brookies.webp" && supplied) {
        await runJob({ from: path.basename(supplied), to: job.to, ...CARD, position: ATTENTION }, listing);
        continue;
      }
      await runPosterJob(job, posterPath);
      written += 1;
    }
    await buildIcons(posterPath);
  } else {
    console.warn("  skip   poster crops (source-images/poster.jpg not found)");
  }

  console.log(`\nDone — ${written} images written to public/images/\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
