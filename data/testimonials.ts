/**
 * Real customer feedback, screenshotted from WhatsApp.
 *
 * These are genuine messages from customers — nothing here is written or
 * invented for the site. The screenshots carry their own timestamps and (in
 * one case) the customer's own name, exactly as they appear in WhatsApp.
 *
 * TO ADD A NEW ONE:
 *   1. Save the screenshot into source-images/feedback/
 *   2. Add it to FEEDBACK_JOBS in scripts/prepare-images.mjs and run
 *      `npm run images`
 *   3. Add a line below pointing at the file it produced
 */

export type Testimonial = {
  image: string;
  /** The real pixel size of the file in public/, from `npm run images` output. */
  width: number;
  height: number;
  alt: string;
};

export const testimonials: Testimonial[] = [
  {
    image: "/images/feedback/feedback-amazing-fudgy.webp",
    width: 760,
    height: 899,
    alt: "WhatsApp message from a customer: Hi! Just wanted to say your brownies are AMAZING! Super fudgy and sweet just like I love 'em. Definitely ordering again!",
  },
  {
    image: "/images/feedback/feedback-delicious-sis.webp",
    width: 760,
    height: 855,
    alt: "WhatsApp message from a customer: Sis, your brownies were really delicious",
  },
  {
    image: "/images/feedback/feedback-awesome-taste.webp",
    width: 760,
    height: 488,
    alt: "WhatsApp message from a customer: Normally I wouldn't expect much, but the taste was awesome. Keep it up, all the best.",
  },
  {
    image: "/images/feedback/feedback-so-fudgy.webp",
    width: 760,
    height: 484,
    alt: "WhatsApp message from a customer named Riswana: Your brownies are so fudgy",
  },
  {
    image: "/images/feedback/feedback-delicious-expected.webp",
    width: 760,
    height: 323,
    alt: "WhatsApp message from a customer: It was so delicious, more than I expected",
  },
];
