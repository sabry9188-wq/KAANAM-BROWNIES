import Image from "next/image";

import { products } from "@/data/products";
import { productOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

/* The box this section sells. Change the slug to feature a different product. */
const FEATURED_SLUG = "chocolate-overload";

export default function FeaturedProduct() {
  const featured =
    products.find((p) => p.slug === FEATURED_SLUG) ?? products[0];

  return (
    <section
      aria-labelledby="featured-heading"
      className="grain relative overflow-hidden bg-cocoa-900 py-20 sm:py-28"
    >
      {/* Soft warm glow behind the picture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-32 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-gold-600/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Picture, with an offset gold frame */}
          <Reveal className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="absolute -top-4 -right-4 bottom-4 left-4 rounded-2xl border border-gold-500/35 sm:-top-6 sm:-right-6 sm:bottom-6 sm:left-6"
              />
              <div className="group relative aspect-4/5 overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/featured.webp"
                  alt="A knife spreading thick melted chocolate over a stack of dark fudge brownies"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="img-zoom object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark">Signature Box</p>
              <h2
                id="featured-heading"
                className="mt-4 font-display text-3xl leading-tight text-cream-50 sm:text-4xl lg:text-5xl"
              >
                Made for Serious{" "}
                <span className="block text-gold-400">Chocolate Cravings</span>
              </h2>
              <div className="rule-gold mt-6" />
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-7 text-base leading-relaxed text-cream-100/75 sm:text-lg">
                This is the one for the days when nothing but chocolate will do.
                A dense, deeply fudgy centre that stays soft right through,
                folded with chocolate and finished with more of it on top.
              </p>
              <p className="mt-4 text-base leading-relaxed text-cream-100/75 sm:text-lg">
                Every tray is baked in a small batch and cut by hand, so the
                edges stay chewy and the middle stays molten-soft. Rich enough
                that one square is plenty — though it rarely stops at one.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-cocoa-700 py-5">
                <div>
                  <span className="block text-[0.6875rem] font-medium tracking-[0.16em] text-cream-100/45 uppercase">
                    Box of
                  </span>
                  <span className="mt-1 block font-display text-xl text-cream-50">
                    {featured.quantity}
                  </span>
                </div>
                <div>
                  <span className="block text-[0.6875rem] font-medium tracking-[0.16em] text-cream-100/45 uppercase">
                    Price
                  </span>
                  <span className="mt-1 block font-display text-xl text-gold-400">
                    {featured.priceLabel}
                  </span>
                </div>
              </div>

              <OrderButton
                href={productOrderUrl(featured)}
                variant="gold"
                size="lg"
                className="mt-8"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                ariaLabel={`Order the ${featured.name} box on WhatsApp`}
              >
                Order Your Box
              </OrderButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
