/**
 * Development helper — screenshots the site at several screen sizes so the
 * layout can be checked without opening a browser by hand.
 *
 *   node scripts/shoot.mjs [baseUrl]
 *
 * Uses the copy of Chrome already installed on this machine, so nothing is
 * downloaded. Output lands in .screens/ (git-ignored).
 */

import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".screens";

const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812, dsf: 2 },
  { name: "tablet-768", width: 768, height: 1024, dsf: 2 },
  { name: "desktop-1440", width: 1440, height: 900, dsf: 1 },
];

const SECTIONS = ["home", "menu", "about", "gallery", "contact"];

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME_PATHS[0] });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dsf,
      isMobile: vp.width < 700,
      hasTouch: vp.width < 700,
    });
    const page = await context.newPage();

    await page.goto(BASE, { waitUntil: "networkidle" });

    // Scroll the whole page once so lazy images and scroll reveals fire.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.8;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 90);
          else setTimeout(resolve, 500);
        };
        step();
      });
    });
    await page.waitForTimeout(700);

    // Report any sideways overflow — the most common responsive bug.
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    const bad = overflow.scrollWidth > overflow.clientWidth + 1;
    console.log(
      `${vp.name}: ${bad ? "HORIZONTAL OVERFLOW" : "no overflow"} ` +
        `(scroll ${overflow.scrollWidth} / client ${overflow.clientWidth})`,
    );

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });

    for (const id of SECTIONS) {
      const el = page.locator(`#${id}`);
      if ((await el.count()) === 0) continue;
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await el.screenshot({ path: `${OUT}/${vp.name}-${id}.png` });
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nScreenshots written to ${OUT}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
