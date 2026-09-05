import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:3000";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = ".screens";

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });

async function scrollAll(page) {
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.8;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 80);
        else setTimeout(r, 500);
      };
      step();
    });
  });
}

// --- Desktop: the sections without an id -------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await scrollAll(page);

  const named = [
    ["featured", "featured-heading"],
    ["howto", "order-heading"],
    ["finalcta", "final-cta-heading"],
  ];
  for (const [file, headingId] of named) {
    const section = page.locator(`section:has(#${headingId})`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await section.screenshot({ path: `${OUT}/desktop-${file}.png` });
  }

  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await footer.screenshot({ path: `${OUT}/desktop-footer.png` });
  await ctx.close();
}

// --- Mobile: menu open, plus a couple of sections ----------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/mobile-menu-open.png` });

  await page.getByRole("button", { name: "Close menu" }).click();
  await page.waitForTimeout(400);

  await scrollAll(page);
  for (const id of ["menu", "gallery"]) {
    const el = page.locator(`#${id}`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `${OUT}/mobile-${id}.png` });
  }

  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await footer.screenshot({ path: `${OUT}/mobile-footer.png` });
  await ctx.close();
}

await browser.close();
console.log("extra screenshots written");
