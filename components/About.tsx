import Image from "next/image";

import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-cream-100 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="group relative aspect-4/5 overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/about.webp"
                  alt="A freshly cut chocolate brownie finished with a chocolate drizzle, resting on paper"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="img-zoom object-cover"
                />
              </div>
              {/* Small script card overlapping the photo. */}
              <div className="absolute -bottom-6 -left-4 max-w-[15rem] rounded-2xl bg-cocoa-950 px-6 py-5 shadow-[var(--shadow-warm)] sm:-left-8">
                <p className="font-script text-2xl leading-tight text-gold-400">
                  {site.script}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 lg:mt-0">
            <Reveal>
              <p className="eyebrow">Our Story</p>
              <h2
                id="about-heading"
                className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl lg:text-5xl"
              >
                Baked With Love
              </h2>
              <div className="rule-gold mt-6" />
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-7 text-base leading-relaxed text-ink-700 sm:text-lg">
                At {site.name}, every box is made with care. We believe a good
                brownie should be rich, fudgy, fresh and unforgettable. From the
                first bite to the last piece, our goal is simple — to make your
                chocolate cravings worth it.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-700 sm:text-lg">
                We bake in small batches so nothing sits around. Good chocolate,
                real butter and proper time in the oven — no shortcuts, because
                you can taste them. Each tray is cut by hand and packed the same
                day it is baked.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-700 sm:text-lg">
                Whether it is a quiet treat for yourself, something sweet for
                the family, or a box to take along to someone, we would love to
                bake it for you.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-beige-300 pt-8">
                {[
                  ["Premium", "ingredients"],
                  ["Fresh", "every batch"],
                  ["Handmade", "with care"],
                ].map(([big, small]) => (
                  <div key={big}>
                    <dt className="font-display text-lg text-cocoa-900 sm:text-xl">
                      {big}
                    </dt>
                    <dd className="mt-1 text-xs tracking-wide text-ink-500 sm:text-sm">
                      {small}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
