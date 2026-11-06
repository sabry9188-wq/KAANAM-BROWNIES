/**
 * CELEBRATION CAKES — custom brownie cakes for birthdays, anniversaries and
 * bridal showers. Size and message are made to each customer's request, so
 * a style shows a starting price ("From Rs. …") rather than a fixed one.
 *
 * TO ADD A PHOTO: put it in source-images/cakes/, run `npm run images`, then
 * add a line to `cakePhotos` below pointing at /images/cakes/<name>.webp.
 */

export type Occasion = "birthday" | "anniversary" | "bridal";

export const occasions: { id: Occasion; label: string }[] = [
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "bridal", label: "Bride to Be" },
];

export type CakeStyleId = "message" | "loaded" | "layered" | "calendar";

export type CakeStyle = {
  name: string;
  description: string;
  /** e.g. "From Rs. 2,500". Leave null to show "Price on request". */
  fromPrice: string | null;
};

export const cakeStyles: Record<CakeStyleId, CakeStyle> = {
  message: {
    name: "Message Brownie Cake",
    description: "Fudgy brownie slab with chocolate drizzle and your name or message.",
    fromPrice: "From Rs. 4,300",
  },
  loaded: {
    name: "Loaded Chocolate Cake",
    description: "Topped with KitKat, Oreo, chocolate pieces and treats.",
    fromPrice: "From Rs. 4,000",
  },
  layered: {
    name: "Layered Brownie Cake",
    description: "Two brownie layers with dripping chocolate and a topper.",
    fromPrice: "From Rs. 3,000",
  },
  calendar: {
    name: "Calendar Brownie Cake",
    description: "Brownie squares piped as a calendar, with the big day marked.",
    fromPrice: "From Rs. 3,600",
  },
};

export type CakePhoto = {
  src: string;
  alt: string;
  style: CakeStyleId;
  occasions: Occasion[];
};

export const cakePhotos: CakePhoto[] = [
  {
    src: "/images/cakes/birthday-chocolate-loaded.webp",
    alt: "Square brownie cake covered in milk and white chocolate pieces, chocolate balls and red butterflies, with a gold Happy Birthday topper",
    style: "loaded",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/anniversary-duo-chocolate.webp",
    alt: "Square brownie cake with dark and milk chocolate halves, white chocolate Happy Anniversary letters and pink heart sprinkles",
    style: "message",
    occasions: ["anniversary"],
  },
  {
    src: "/images/cakes/bride-to-be-layered.webp",
    alt: "Two-layer brownie cake with dripping chocolate, pink hearts and a silver Bride to Be topper",
    style: "layered",
    occasions: ["bridal"],
  },
  {
    src: "/images/cakes/calendar-october.webp",
    alt: "Brownie cake cut into squares piped as an October calendar, with the 24th highlighted in white chocolate and HBD below",
    style: "calendar",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-white-chip-border.webp",
    alt: "Dark chocolate brownie cake bordered with white chocolate chips, a gold Happy Birthday topper and names in white chocolate",
    style: "message",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-oreo-kitkat.webp",
    alt: "Nine-square brownie cake topped with Oreos, KitKat, chocolate hearts and white chips, with a yellow Happy Birthday topper",
    style: "loaded",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-layered-loaf.webp",
    alt: "Tall layered brownie cake with chocolate drip, pink flower sprinkles and a gold Happy Birthday topper on the front",
    style: "layered",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/calendar-november.webp",
    alt: "Brownie cake piped as a November calendar with the 1st marked in white chocolate and HBD letters along the bottom",
    style: "calendar",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-milk-chocolate-nuts.webp",
    alt: "Milk chocolate piped brownie cake with a script Happy Birthday topper, crushed nuts in the corners and pink flowers",
    style: "message",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-kitkat-almond.webp",
    alt: "Glossy chocolate brownie cake lined with KitKat fingers and almonds, with a gold HBD name topper",
    style: "loaded",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-gift-box.webp",
    alt: "Dark chocolate brownie cake in a clear gift box with a gold HBD name topper and pink and gold sprinkles",
    style: "message",
    occasions: ["birthday"],
  },
  {
    src: "/images/cakes/birthday-mini-kitkat.webp",
    alt: "Small glossy brownie cake with KitKat, chocolate balls and a gold Happy Birthday topper",
    style: "loaded",
    occasions: ["birthday"],
  },
];
