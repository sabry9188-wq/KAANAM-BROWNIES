# Kaanam Brownies — website

_Rich. Fudgy. Irresistible._

A single-page website for Kaanam Brownies. Every order button opens WhatsApp with
the message already written. There is no database, no login and no admin panel —
you edit two files and the whole site updates.

---

## Running it

```bash
npm install      # once
npm run dev      # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the site while you work on it |
| `npm run build` | Make the production build |
| `npm run start` | Serve the production build |
| `npm run images` | Rebuild the optimised photos from `source-images/` |
| `npm run lint` | Check the code |

---

## 1. Changing prices, names and descriptions

Everything on the menu lives in **`data/products.ts`** — one block per product:

```ts
{
  slug: "fudge-brownie",
  name: "Fudge Brownie",
  description: "Rich, moist & fudgy chocolate brownie.",
  quantity: "6 pieces",
  priceLabel: "Rs. 800",     // what customers see
  priceValue: 800,           // the same number, for Google listings
  image: "/images/fudge-brownie.webp",
  alt: "Three fudge brownies stacked on a dark plate…",
}
```

Change it here and it updates the menu card, the WhatsApp order message and the
Google listing data all at once. **Keep `priceLabel` and `priceValue` in step.**

Phone number, address and tagline live in **`data/site.ts`**.

---

## 2. Putting in your own photos ← read this one

Your original photographs are in **`source-images/`**. They are untouched; the
website uses smaller, faster copies in `public/images/`.

**To swap a photo:**

1. Put your new picture in `source-images/`, named exactly as in the table below
   (any format — `.jpg`, `.png`, `.webp`, `.heic` — the extension doesn't matter).
2. Run `npm run images`.

That's it. The site picks it up automatically.

| Put your photo here | Where it appears |
| --- | --- |
| `source-images/brownie cookies 1.jpg` | Brownie Cookies menu card |
| `source-images/nuts brownie 1.jpg` | Nuts Brownie menu card |
| `source-images/fudge brownie 1.jpg` | Fudge Brownie menu card |
| `source-images/blondie 1.jpg` | Blondie menu card |
| `source-images/chocolate overload 1.jpg` | Chocolate Overload menu card |
| `source-images/brookies.jpg` | **Brookies menu card** — see the note below |
| `source-images/fudge brownie 2.jpg` | Big hero picture at the top |
| `source-images/chocolate overload 2.jpg` | "Made for Serious Chocolate Cravings" |
| `source-images/brownie drizzle.jpg` | "Baked With Love" story picture |
| `source-images/nuts brownie 2.jpg` | Gallery — wide tile |
| `source-images/brownie cookies 2.jpg` | Gallery |
| `source-images/blondie 2.jpg` | Gallery |
| `source-images/brownie tray.jpg` | Gallery — wide tile |
| `source-images/poster.jpg` | Your logo and the Brookies picture are cut from this |

> ### ⚠️ Replace the Brookies photo first
>
> Brookies is the one product you had no photograph of, so its picture is cut
> out of your poster. It works, but it is lower resolution than the others.
>
> When you have a real photo, save it as **`source-images/brookies.jpg`** and run
> `npm run images`. The script will notice it and use your photo instead of the
> poster crop — no code changes needed.

**Photo tips:** for menu cards use an upright (portrait) photo. For the two wide
gallery tiles and the hero, use a landscape photo — a tall photo squeezed into a
wide space loses most of the food.

**In a hurry?** You can skip all of the above and drop a finished picture straight
into `public/images/`, using the same filename that's already there.

---

## 3. Adding customer feedback

Real WhatsApp screenshots from customers appear in the **What Our Customers Say**
section, listed in **`data/testimonials.ts`**.

**To add a new one:**

1. Save the screenshot into `source-images/feedback/`.
2. Open `scripts/prepare-images.mjs`, find `FEEDBACK_JOBS`, and add a line for it
   (copy the pattern of the ones already there).
3. Run `npm run images`.
4. Open `data/testimonials.ts` and add an entry pointing at the file it made —
   the console output from step 3 tells you the exact width and height to put in.

Nothing is retyped or edited — the screenshots are shown exactly as the customer
sent them.

## 4. The map and location

The map on the Contact section is a live, interactive map centred on your real
coordinates — no Google API key needed, so it costs nothing to run. The
**"Get Directions on Google Maps"** button underneath opens your actual Google
Maps link, for turn-by-turn directions.

If you ever move, or want to fine-tune the exact map view, open **`data/site.ts`**
and update `latitude`, `longitude`, `mapUrl` and `mapEmbedUrl` together.

> Why not a Google Maps embed? Google retired the free, key-free way to embed a
> map a while back — it now requires a billed API key. Rather than ask you to set
> one up, the site uses OpenStreetMap for the visual (which needs no key and is
> centred on the same spot), while the button still sends people to Google Maps
> by name, which is what most people actually open on their phone.

## 5. Adding your Instagram / Facebook

The social icons in the footer are deliberately switched off — we don't have your
real page addresses, and a link that goes nowhere is worse than none. Open
**`components/Footer.tsx`**, find the comment marked `SOCIAL LINKS`, and follow
the two-line instruction there.

---

## 6. Putting it online

1. Push this folder to GitHub.
2. Go to [vercel.com](https://vercel.com), choose **Add New → Project**, and pick
   the repository. Vercel detects Next.js on its own — just press Deploy.
3. Once it's live, open **`data/site.ts`** and set `url` to your real address.
   That's what makes the nice preview card appear when someone shares your link
   on WhatsApp or Facebook.

---

## About the WhatsApp links

Your number is `075 619 8015`. WhatsApp links need the international form with no
plus sign and no leading zero, so the site uses **`94756198015`** (`+94` for Sri
Lanka). A link built as `wa.me/0756198015` would **not** reach you.

This is handled for you in `lib/whatsapp.ts` — if you ever change the number,
change it there and everywhere on the site updates. The tap-to-call button uses
the local form `tel:0756198015`, exactly as printed on your poster.

---

## Where things are

```
app/          layout, page, styles, favicon
components/   one file per section of the page
data/         products.ts, site.ts, gallery.ts  ← what you'll edit
lib/          whatsapp.ts — how order links are built
public/images/ the optimised pictures the site serves
source-images/ your full-size originals
scripts/      prepare-images.mjs and the checking tools
```

### The checking tools

Used while building the site; keep them for later changes. Start the site first
(`npm run dev`), then in another terminal:

```bash
node scripts/audit.mjs http://localhost:3000        # broken images, links, tap sizes
node scripts/check-links.mjs http://localhost:3000  # prints every WhatsApp message
node scripts/shoot.mjs http://localhost:3000        # screenshots at phone/tablet/desktop
```

They use the copy of Chrome already on your computer and write screenshots to
`.screens/`. They are development helpers only — nothing in them ships to visitors.
