/**
 * Business details for Kaanam Brownies.
 * Everything here comes from the shop's own poster — edit it in one place.
 */

export const site = {
  name: "Kaanam Brownies",
  nameUpper: "KAANAM BROWNIES",
  tagline: "Rich. Fudgy. Irresistible.",
  script: "Baked with love, just for you",
  description:
    "Freshly baked brownies, brownie cookies, blondies, brookies and chocolate treats from Kaanam Brownies. Order fresh brownies through WhatsApp.",

  /** Displayed to people. */
  phoneDisplay: "075 619 8015",
  /** Used in the tel: link — the local dialling form. */
  phoneTel: "0756198015",
  /** International form (+94, leading 0 dropped) — required by wa.me and schema.org. */
  phoneIntl: "+94756198015",

  addressLine: "Kuttikarach, Kinniya - 5",
  addressLocality: "Kinniya",
  addressCountry: "LK",

  /** Real coordinates for the shop, used for the map and the Google listing data. */
  latitude: 8.493139266967773,
  longitude: 81.18061828613281,
  /** The link people tap to open this location in Google Maps, for directions. */
  mapUrl:
    "https://maps.google.com/maps?q=8.493139266967773%2C81.18061828613281&z=17&hl=en",
  /**
   * The on-page map preview. Google retired its key-free iframe embed (the old
   * "output=embed" trick now 404s everywhere), and a live Google map needs a
   * billed API key we don't have. OpenStreetMap's embed needs no key and
   * centres on the same real coordinates — the button below still opens the
   * exact Google Maps link above for turn-by-turn directions.
   */
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=81.1746%2C8.4891%2C81.1866%2C8.4971&layer=mapnik&marker=8.493139%2C81.180618",

  /**
   * Public URL of the deployed site. Update this after your first Vercel
   * deploy so link previews on WhatsApp and Facebook pick up the right image.
   */
  url: "https://kaanam-brownies.vercel.app",
} as const;

/** The three promises printed on the poster. */
export const brandValues = [
  {
    title: "Premium Ingredients",
    body: "Made with carefully selected ingredients for rich flavour and texture.",
    icon: "sparkles",
  },
  {
    title: "Baked Fresh Daily",
    body: "Freshly baked to give you that soft, fudgy brownie experience.",
    icon: "croissant",
  },
  {
    title: "Made With Love",
    body: "Every box is prepared with care, because every order matters.",
    icon: "heart",
  },
] as const;

/** Anchors used by the header, the mobile menu and the footer. */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;
