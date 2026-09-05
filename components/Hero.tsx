import Image from "next/image";
import { ArrowDown } from "lucide-react";

import { site } from "@/data/site";
import { generalOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="grain relative isolate flex min-h-[92svh] items-center overflow-hidden bg-cocoa-950 pt-24 pb-16 sm:pt-28"
    >
      {/* Background photograph */}
      <Image
        src="/images/hero.webp"
        alt="Chocolate sauce drizzled over freshly baked fudge brownies on a wooden board"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Two scrims: one darkens the top so the header stays readable, one
          anchors the text at the bottom. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa-950/92 via-cocoa-950/72 to-cocoa-950/94"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa-950/85 via-cocoa-950/35 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-on-dark animate-[fadeUp_0.7s_ease-out_both]">
            {site.addressLine}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 font-display text-[2.75rem] leading-[1.05] text-cream-50 animate-[fadeUp_0.7s_0.08s_ease-out_both] sm:text-6xl lg:text-7xl"
          >
            Rich. Fudgy.{" "}
            <span className="block text-gold-400">Irresistible.</span>
          </h1>

          <p className="mt-5 font-script text-3xl text-gold-300 animate-[fadeUp_0.7s_0.16s_ease-out_both] sm:text-4xl">
            Brownies baked with love, just for you.
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/80 animate-[fadeUp_0.7s_0.24s_ease-out_both] sm:text-lg">
            Freshly baked brownies, cookies and chocolate treats made with
            premium ingredients for every craving.
          </p>

          <div className="mt-9 flex flex-col gap-3 animate-[fadeUp_0.7s_0.32s_ease-out_both] sm:flex-row sm:gap-4">
            <OrderButton
              href={generalOrderUrl}
              variant="gold"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Order Now
            </OrderButton>
            <OrderButton href="#menu" variant="outline" size="lg" external={false}>
              Explore Our Menu
            </OrderButton>
          </div>

          {/* The poster's three promises, as a quiet trust line. */}
          <ul className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[0.6875rem] font-medium tracking-[0.16em] text-cream-100/55 uppercase animate-[fadeUp_0.7s_0.4s_ease-out_both] sm:gap-x-6 sm:tracking-[0.18em]">
            <li>Premium Ingredients</li>
            <li aria-hidden className="hidden text-gold-600 sm:block">
              &bull;
            </li>
            <li>Baked Fresh Daily</li>
            <li aria-hidden className="hidden text-gold-600 sm:block">
              &bull;
            </li>
            <li>Made With Love</li>
          </ul>
        </div>
      </div>

      <a
        href="#why"
        aria-label="Scroll to find out more"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-cream-100/40 transition-colors hover:text-gold-400 lg:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
