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
const FEEDBACK_SRC = path.join(SRC, "feedback");
const FEEDBACK_OUT = path.join(OUT, "feedback");

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
  { from: "choco blast 1.jpg", to: "choco-blast.webp", ...CARD, position: ATTENTION },
  // Landscape photo: "west" keeps the two left slices whole.
  { from: "mango cheesecake 1.jpg", to: "mango-cheesecake.webp", ...CARD, position: "west" },

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
 * Crop taken from the poster (source-images/poster.jpg, 1280x853).
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
];

/**
 * Crops taken from the dedicated logo badge (source-images/logo-badge.jpg,
 * 1302x1208) — the crescent-and-brownie-stack emblem, sharper and higher
 * resolution than anything cut from the poster.
 */
const LOGO_JOBS = [
  // Full badge: crest + KAANAM BROWNIES + address. Used in the footer, and
  // handy on its own for a WhatsApp Business or social profile picture.
  {
    to: "logo.png",
    extract: { left: 40, top: 20, width: 1220, height: 1170 },
    width: 900,
    format: "png",
  },
  // Crest only (crescent + brownie stack). Used in the header and the favicon.
  {
    to: "logo-mark.png",
    extract: { left: 430, top: 30, width: 440, height: 440 },
    width: 512,
    format: "png",
  },
];

/** Pixel box on the logo badge for the crest, reused by the favicon builder. */
const CREST = { left: 430, top: 30, width: 440, height: 440 };

/**
 * Real WhatsApp screenshots from customers. These are NOT cropped to a fixed
 * shape like the product photos — a testimonial has to keep its full text, so
 * every one just gets scaled down to a sensible width and left at its own
 * natural height. See data/testimonials.ts for where they are displayed.
 *
 * TO ADD A NEW ONE: save the screenshot into source-images/feedback/, add a
 * line below pointing at it, then add a matching entry to
 * data/testimonials.ts.
 */
const FEEDBACK_WIDTH = 760; // wide enough to stay sharp at ~380px on a retina phone

const FEEDBACK_JOBS = [
  { from: "feedback-amazing-fudgy.jpg", to: "feedback-amazing-fudgy.webp", width: FEEDBACK_WIDTH },
  { from: "feedback-so-fudgy.jpg", to: "feedback-so-fudgy.webp", width: FEEDBACK_WIDTH },
  { from: "feedback-awesome-taste.jpg", to: "feedback-awesome-taste.webp", width: FEEDBACK_WIDTH },
  { from: "feedback-delicious-sis.jpg", to: "feedback-delicious-sis.webp", width: FEEDBACK_WIDTH },
  { from: "feedback-delicious-expected.jpg", to: "feedback-delicious-expected.webp", width: FEEDBACK_WIDTH },
];

/**
 * Celebration cakes (birthday / anniversary / bride-to-be). Every file in
 * source-images/cakes/ becomes public/images/cakes/<same-name>.webp — no list
 * to maintain here. Then add the photo to data/cakes.ts to show it.
 *
 * The lettering and toppings are the whole point of these photos, so they
 * are never cropped hard: a photo already close to the 4:5 card shape is
 * trimmed slightly, anything wider or squarer is fitted whole onto a blurred,
 * darkened copy of itself.
 */
const CAKES_SRC = path.join(SRC, "cakes");
const CAKES_OUT = path.join(OUT, "cakes");

async function runCakeJob(file) {
  const source = path.join(CAKES_SRC, file);
  const to = file.replace(/\.[^.]+$/, ".webp");
  const { width: W, height: H } = CARD;
  const meta = await sharp(source).rotate().metadata();
  const ratio = (meta.autoOrient?.width ?? meta.width) / (meta.autoOrient?.height ?? meta.height);

  let pipe;
  if (ratio >= 0.7 && ratio <= 0.9) {
    pipe = sharp(source).rotate().resize({ width: W, height: H, fit: "cover", position: "centre" });
  } else {
    const backdrop = await sharp(source)
      .rotate()
      .resize({ width: W, height: H, fit: "cover" })
      .blur(40)
      .modulate({ brightness: 0.55 })
      .toBuffer();
    const front = await sharp(source).rotate().resize({ width: W, height: H, fit: "inside" }).toBuffer();
    pipe = sharp(backdrop).composite([{ input: front, gravity: "centre" }]);
  }

  const info = await pipe.webp({ quality: 80, effort: 5 }).toFile(path.join(CAKES_OUT, to));
  console.log(`  write  cakes/${to.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

async function ensureDirs() {
  await mkdir(OUT, { recursive: true });
  await mkdir(FEEDBACK_OUT, { recursive: true });
  await mkdir(CAKES_OUT, { recursive: true });
}

/** Finds a source file by name inside `dir`, ignoring the extension. */
async function findSource(dir, name, listing) {
  const direct = path.join(dir, name);
  if (existsSync(direct)) return direct;
  const base = name.replace(/\.[^.]+$/, "").toLowerCase();
  const match = listing.find((f) => f.replace(/\.[^.]+$/, "").toLowerCase() === base);
  return match ? path.join(dir, match) : null;
}

async function runJob(job, listing, { dir = SRC, outDir = OUT, noCrop = false } = {}) {
  const source = await findSource(dir, job.from, listing);
  if (!source) {
    console.warn(`  skip   ${job.to.padEnd(30)} (missing source: ${job.from})`);
    return false;
  }

  let pipe = sharp(source, { failOn: "none" }).rotate();

  // Testimonial screenshots: scale the width down, keep every pixel of the
  // conversation — no fixed aspect ratio to crop to.
  pipe = noCrop
    ? pipe.resize({ width: job.width, withoutEnlargement: true })
    : pipe.resize({
        width: job.width,
        height: job.height,
        fit: "cover",
        position: job.position ?? "centre",
        withoutEnlargement: false,
      });

  const target = path.join(outDir, job.to);
  if (job.format === "jpeg") {
    pipe = pipe.jpeg({ quality: job.quality ?? 82, mozjpeg: true });
  } else {
    pipe = pipe.webp({ quality: job.quality ?? 80, effort: 5 });
  }

  const info = await pipe.toFile(target);
  console.log(`  write  ${job.to.padEnd(30)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  return true;
}

/** Runs an exact pixel-box crop (used for the poster and the logo badge). */
async function runCropJob(job, sourcePath) {
  let pipe = sharp(sourcePath).extract(job.extract);

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
async function buildIcons(logoBadgePath) {
  const mark = sharp(logoBadgePath).extract(CREST);

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

  const posterPath = await findSource(SRC, "poster.jpg", listing);
  if (posterPath) {
    for (const job of POSTER_JOBS) {
      // Don't overwrite a real photo the owner has supplied.
      const supplied = await findSource(SRC, job.to.replace(/\.webp$/, ".jpg"), listing);
      if (job.to === "brookies.webp" && supplied) {
        await runJob({ from: path.basename(supplied), to: job.to, ...CARD, position: ATTENTION }, listing);
        continue;
      }
      await runCropJob(job, posterPath);
      written += 1;
    }
  } else {
    console.warn("  skip   poster crops (source-images/poster.jpg not found)");
  }

  const logoBadgePath = await findSource(SRC, "logo-badge.jpg", listing);
  if (logoBadgePath) {
    for (const job of LOGO_JOBS) {
      await runCropJob(job, logoBadgePath);
      written += 1;
    }
    await buildIcons(logoBadgePath);
  } else {
    console.warn("  skip   logo crops (source-images/logo-badge.jpg not found)");
  }

  console.log("\nCustomer feedback screenshots\n");
  if (existsSync(FEEDBACK_SRC)) {
    const feedbackListing = await readdir(FEEDBACK_SRC);
    for (const job of FEEDBACK_JOBS) {
      const ok = await runJob(job, feedbackListing, {
        dir: FEEDBACK_SRC,
        outDir: FEEDBACK_OUT,
        noCrop: true,
      });
      if (ok) written += 1;
    }
  } else {
    console.warn("  skip   feedback screenshots (source-images/feedback/ not found)");
  }

  console.log("\nCelebration cakes\n");
  if (existsSync(CAKES_SRC)) {
    for (const file of (await readdir(CAKES_SRC)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))) {
      await runCakeJob(file);
      written += 1;
    }
  } else {
    console.warn("  skip   cakes (source-images/cakes/ not found)");
  }

  console.log(`\nDone — ${written} images written to public/images/\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
