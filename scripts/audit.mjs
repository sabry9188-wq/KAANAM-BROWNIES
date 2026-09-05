/**
 * Development helper — checks the live page for the things that are easy to
 * get wrong and hard to see: duplicated sections, broken images, bad links,
 * heading order and tap-target sizes.
 *
 *   node scripts/audit.mjs [baseUrl]
 */

import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3000";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  let failures = 0;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.width < 700,
      hasTouch: vp.width < 700,
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => consoleErrors.push(String(e)));

    const failedRequests = [];
    page.on("requestfailed", (r) => failedRequests.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`);
    });

    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.9;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 60);
          else setTimeout(resolve, 400);
        };
        step();
      });
    });

    // Give every image a fair chance to finish decoding before judging it.
    await page
      .waitForFunction(
        () =>
          Array.from(document.images).every(
            (img) => img.complete && img.naturalWidth > 0,
          ),
        null,
        { timeout: 15000 },
      )
      .catch(() => console.log("  (some images still not decoded after 15s)"));

    const report = await page.evaluate(() => {
      const q = (s) => Array.from(document.querySelectorAll(s));

      return {
        docHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        h1s: q("h1").map((h) => h.textContent.trim()),
        headings: q("h1,h2,h3").map((h) => `${h.tagName} ${h.textContent.trim().slice(0, 46)}`),
        sectionIds: q("section[id]").map((s) => s.id),
        productCards: q("#menu article").length,
        galleryTiles: q("#gallery [class*='rounded-2xl']").length,
        imagesTotal: q("img").length,
        imagesBroken: q("img")
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute("src")),
        imagesNoAlt: q("img").filter((img) => img.alt === null).length,
        waLinks: q('a[href*="wa.me"]').map((a) => a.getAttribute("href")),
        telLinks: q('a[href^="tel:"]').map((a) => a.getAttribute("href")),
        hashLinks: q('a[href^="#"]').map((a) => a.getAttribute("href")),
        emptyHrefs: q("a").filter((a) => {
          const h = a.getAttribute("href");
          return !h || h === "#" || h === "";
        }).length,
        smallTapTargets: q("a,button")
          .filter((el) => {
            const r = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            if (style.display === "none" || style.visibility === "hidden") return false;
            if (r.width === 0 && r.height === 0) return false;
            return r.height < 40;
          })
          .map((el) => `${el.tagName} "${el.textContent.trim().slice(0, 30)}" h=${Math.round(el.getBoundingClientRect().height)}`),
      };
    });

    console.log(`\n===== ${vp.name} =====`);
    console.log(`document height   ${report.docHeight}px`);
    console.log(`overflow          ${report.scrollWidth > report.clientWidth + 1 ? "YES — PROBLEM" : "none"}`);
    console.log(`<h1> count        ${report.h1s.length} ${report.h1s.length === 1 ? "" : "— PROBLEM"}  ${JSON.stringify(report.h1s)}`);
    console.log(`section ids       ${report.sectionIds.join(", ")}`);
    console.log(`product cards     ${report.productCards} ${report.productCards === 6 ? "" : "— PROBLEM"}`);
    console.log(`images            ${report.imagesTotal} total, ${report.imagesBroken.length} broken`);
    if (report.imagesBroken.length) {
      console.log(`  BROKEN: ${report.imagesBroken.join("\n          ")}`);
      failures += 1;
    }
    console.log(`images w/o alt    ${report.imagesNoAlt}`);
    console.log(`wa.me links       ${report.waLinks.length}`);
    console.log(`tel: links        ${report.telLinks.join(", ")}`);
    console.log(`in-page anchors   ${[...new Set(report.hashLinks)].join(", ")}`);
    console.log(`empty/# hrefs     ${report.emptyHrefs} ${report.emptyHrefs ? "— PROBLEM" : ""}`);
    console.log(`tap targets <40px ${report.smallTapTargets.length}`);
    report.smallTapTargets.forEach((t) => console.log(`  ${t}`));

    // Every in-page anchor must point at something that exists.
    for (const href of [...new Set(report.hashLinks)]) {
      const id = href.slice(1);
      const exists = await page.locator(`#${id}`).count();
      if (!exists) {
        console.log(`  BROKEN ANCHOR: ${href}`);
        failures += 1;
      }
    }

    // Every WhatsApp link must use the international number and carry a message.
    const badWa = report.waLinks.filter(
      (h) => !h.startsWith("https://wa.me/94756198015?text="),
    );
    if (badWa.length) {
      console.log(`  BAD WHATSAPP LINKS: ${badWa.join(", ")}`);
      failures += 1;
    }

    if (consoleErrors.length) {
      console.log(`console errors    ${consoleErrors.length}`);
      consoleErrors.forEach((e) => console.log(`  ${e}`));
      failures += 1;
    }
    const realFailures = failedRequests.filter((u) => !u.includes("favicon"));
    if (realFailures.length) {
      console.log(`failed requests   ${realFailures.length}`);
      realFailures.forEach((u) => console.log(`  ${u}`));
      failures += 1;
    }

    console.log("heading outline:");
    report.headings.forEach((h) => console.log(`  ${h}`));

    await context.close();
  }

  await browser.close();
  console.log(failures ? `\n${failures} problem group(s) found.` : "\nAll checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
