import Image from "next/image";

import { generalOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="grain relative isolate overflow-hidden bg-cocoa-950 py-24 sm:py-32"
    >
      <Image
        src="/images/cta-band.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa-950 via-cocoa-950/80 to-cocoa-950"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="font-display text-3xl leading-tight text-cream-50 sm:text-5xl lg:text-[3.5rem]"
          >
            Your Next Chocolate{" "}
            <span className="block text-gold-400">Craving Starts Here.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-7 text-base text-cream-100/75 sm:text-lg">
            Rich. Fudgy. Freshly baked. Made with love.
          </p>

          <div className="mt-10 flex justify-center">
            <OrderButton
              href={generalOrderUrl}
              variant="gold"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Order Your Brownies
            </OrderButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
