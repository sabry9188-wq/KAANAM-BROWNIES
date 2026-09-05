import { Croissant, Heart, Sparkles } from "lucide-react";

import { brandValues } from "@/data/site";
import Reveal from "./Reveal";

const icons = {
  sparkles: Sparkles,
  croissant: Croissant,
  heart: Heart,
} as const;

export default function Features() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="border-b border-cream-200 bg-cream-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why Kaanam Brownies</p>
          <h2
            id="why-heading"
            className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl"
          >
            Small batches, serious chocolate
          </h2>
          <div className="rule-gold mx-auto mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {brandValues.map((value, i) => {
            const Icon = icons[value.icon];
            return (
              <Reveal key={value.title} delay={i * 90}>
                <article className="group h-full rounded-2xl border border-cream-200 bg-white/70 p-8 shadow-[var(--shadow-card)] transition-all duration-400 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-[var(--shadow-card-hover)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cocoa-900 text-gold-400 transition-colors duration-400 group-hover:bg-gold-500 group-hover:text-cocoa-950">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-7 font-display text-xl text-cocoa-900">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
