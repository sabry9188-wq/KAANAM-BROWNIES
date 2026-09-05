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
