import Image from "next/image";

import { testimonials } from "@/data/testimonials";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Testimonials() {
  return (
    <section
      id="feedback"
      aria-labelledby="feedback-heading"
      className="bg-cream-100 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Customer Love</p>
          <h2
            id="feedback-heading"
            className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl lg:text-5xl"
          >
            What Our Customers Say
          </h2>
          <div className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-base leading-relaxed text-ink-700 sm:text-lg">
            Real messages from real customers, straight from WhatsApp.
          </p>
        </Reveal>

        {/* CSS-columns masonry — each screenshot keeps its own natural height,
            nothing here is cropped or retyped. */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((item, i) => (
            <Reveal
              key={item.image}
              delay={(i % 3) * 90}
              className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-beige-300 bg-cocoa-950 shadow-[var(--shadow-card)] transition-shadow duration-400 hover:shadow-[var(--shadow-card-hover)]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex items-center justify-center gap-2.5 text-sm text-ink-500">
          <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
          Shared with permission from real Kaanam Brownies customers
        </Reveal>
      </div>
    </section>
  );
}
