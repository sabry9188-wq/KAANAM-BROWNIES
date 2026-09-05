/**
 * Photographs used in the Gallery section.
 *
 * `span` is how many columns a picture takes on a wide screen, out of four.
 * The pictures below are ordered so the rows fill neatly: 2+1+1 then 1+1+2.
 * If you add or remove one, keep each row adding up to 4.
 *
 * A `span: 2` picture is displayed wide, so give those slots landscape shots —
 * a tall photo cropped into a wide box loses most of the food.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  span: 1 | 2;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-nuts-slab.webp",
    alt: "A whole tray-baked nuts brownie covered in toasted flaked almonds",
    caption: "Fresh from the tray",
    span: 2,
  },
  {
    src: "/images/gallery-cookie-stack.webp",
    alt: "Brownie cookies tumbling onto a stack beside broken chocolate bars",
    caption: "Brownie cookies",
    span: 1,
  },
  {
    src: "/images/gallery-ganache.webp",
    alt: "Chocolate ganache dripping down a stack of fudge brownies on a dark plate",
    caption: "Ganache poured over",
    span: 1,
  },
  {
    src: "/images/gallery-blondie.webp",
    alt: "A close view of a golden blondie showing its soft, chewy centre",
    caption: "Buttery blondies",
    span: 1,
  },
  {
    src: "/images/gallery-pour.webp",
    alt: "A ribbon of melted chocolate being poured over a stack of brownies",
    caption: "Chocolate overload",
    span: 1,
  },
  {
    src: "/images/gallery-brownie-tray.webp",
    alt: "A row of chocolate brownie slices lined up on a white serving tray with chocolate sauce",
    caption: "Cut and ready to box",
    span: 2,
  },
];
