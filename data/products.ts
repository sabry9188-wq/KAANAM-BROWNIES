/**
 * THE MENU.
 *
 * This is the only file you need to edit to change a name, description,
 * quantity or price. The website, the WhatsApp order messages and the search
 * engine listing all read from here.
 *
 * To change a photo, see `image` below and the instructions in README.md.
 */

export type Product = {
  /** Used for React keys and for the image filename. Keep it lowercase-with-dashes. */
  slug: string;
  name: string;
  description: string;
  /** Shown on the card, e.g. "6 pieces". Also used in the WhatsApp message. */
  quantity: string;
  /** Shown on the card, e.g. "Rs. 1,200". Also used in the WhatsApp message. */
  priceLabel: string;
  /** The same price as a plain number — used only by the Google listing data. */
  priceValue: number;
  /** Path inside /public. Replace the file, keep the path. */
  image: string;
  /** Description of the photo, read aloud by screen readers. */
  alt: string;
};

export const products: Product[] = [
  {
    slug: "brownie-cookies",
    name: "Brownie Cookies",
    description: "Soft, fudgy & chewy chocolate cookies.",
    quantity: "10 pieces",
    priceLabel: "Rs. 1,500",
    priceValue: 1500,
    image: "/images/brownie-cookies.webp",
    alt: "A stack of thick brownie cookies with glossy, crackled chocolate tops",
  },
  {
    slug: "nuts-brownie",
    name: "Nuts Brownie",
    description: "Fudgy brownie loaded with crunchy nuts.",
    quantity: "6 pieces",
    priceLabel: "Rs. 1,200",
    priceValue: 1200,
    image: "/images/nuts-brownie.webp",
    alt: "A thick square nuts brownie topped with a toasted walnut, cooling on a wire rack",
  },
  {
    slug: "fudge-brownie",
    name: "Fudge Brownie",
    description: "Rich, moist & fudgy chocolate brownie.",
    quantity: "6 pieces",
    priceLabel: "Rs. 800",
    priceValue: 800,
    image: "/images/fudge-brownie.webp",
    alt: "Three fudge brownies stacked on a dark plate with chocolate ganache pouring down the side",
  },
  {
    slug: "blondie",
    name: "Blondie",
    description: "Soft, chewy & buttery blondie.",
    quantity: "6 pieces",
    priceLabel: "Rs. 1,000",
    priceValue: 1000,
    image: "/images/blondie.webp",
    alt: "Two golden buttery blondie squares topped with pecans on a cream plate",
  },
  {
    slug: "chocolate-overload",
    name: "Chocolate Overload",
    description: "Rich brownie loaded with chocolate goodness.",
    quantity: "6 pieces",
    priceLabel: "Rs. 1,000",
    priceValue: 1000,
    image: "/images/chocolate-overload.webp",
    alt: "Melted chocolate pouring over a tall stack of dark chocolate brownies",
  },
  {
    slug: "brookies",
    name: "Brookies",
    description: "The perfect combination of brownie & cookie.",
    quantity: "6 pieces",
    priceLabel: "Rs. 1,200",
    priceValue: 1200,
    image: "/images/brookies.webp",
    alt: "Stacked brookies showing a fudgy brownie base under a golden chocolate chip cookie layer",
  },
  {
    slug: "choco-blast",
    name: "Kaanam Choco Blast",
    description:
      "Rich chocolate-coated brownie bites loaded with chocolate chips. Every bite is a chocolate explosion! One bowl, endless chocolate happiness.",
    quantity: "360g",
    priceLabel: "Rs. 1,400",
    priceValue: 1400,
    image: "/images/choco-blast.webp",
    alt: "A kraft bowl of chocolate-coated brownie bites topped with dark and white chocolate chips, beside a lidded Kaanam Brownies tub",
  },
];
