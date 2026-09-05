import Image from "next/image";

import { galleryImages } from "@/data/gallery";
import Reveal from "./Reveal";

/* Tiles share a fixed height per breakpoint, so the mosaic never collapses;
   only the width changes. */
const spanClasses = {
  1: "sm:col-span-1 md:col-span-1",
  2: "sm:col-span-2 md:col-span-2",
} as const;

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-cream-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Gallery</p>
          <h2
            id="gallery-heading"
            className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl lg:text-5xl"
          >
            Straight From Our Kitchen
          </h2>
          <div className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-base leading-relaxed text-ink-700 sm:text-lg">
            Fudgy centres, chocolate drizzle and golden crackled tops — here is
            what comes out of the oven.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {galleryImages.map((image, i) => (
            <Reveal
              key={image.src}
              delay={(i % 4) * 70}
              className={`group relative h-64 overflow-hidden rounded-2xl bg-cream-100 shadow-[var(--shadow-card)] sm:h-72 md:h-68 lg:h-76 ${spanClasses[image.span]}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 50vw, (min-width: 640px) 50vw, 100vw"
                className="img-zoom object-cover"
              />
              {/* Caption veil, revealed on hover and always shown on touch screens. */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-cocoa-950/80 via-cocoa-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-md:opacity-100">
                <span className="p-5 text-sm font-medium tracking-wide text-cream-50">
                  {image.caption}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
