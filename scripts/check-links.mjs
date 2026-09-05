/**
 * Development helper — prints every WhatsApp and phone link the live page
 * contains, with the message decoded, so the exact text a customer sends can
 * be read and checked.
 *
 *   node scripts/check-links.mjs [baseUrl]
 */

import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3000";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.goto(BASE, { waitUntil: "networkidle" });

const waLinks = await page.$$eval('a[href*="wa.me"]', (as) => [
  ...new Set(as.map((a) => a.getAttribute("href"))),
]);

console.log(`\n${waLinks.length} distinct WhatsApp links\n`);
for (const link of waLinks) {
  const url = new URL(link);
  console.log(`number : ${url.pathname.slice(1)}`);
  console.log(`message: ${decodeURIComponent(url.searchParams.get("text"))}`);
  console.log("-".repeat(60));
}

const telLinks = await page.$$eval('a[href^="tel:"]', (as) => [
  ...new Set(as.map((a) => a.getAttribute("href"))),
]);
console.log(`\nphone links: ${telLinks.join(", ")}`);

const targets = await page.$$eval('a[target="_blank"]', (as) =>
  as.filter((a) => !(a.rel || "").includes("noopener")).length,
);
console.log(`new-tab links missing rel="noopener": ${targets}`);

await browser.close();
