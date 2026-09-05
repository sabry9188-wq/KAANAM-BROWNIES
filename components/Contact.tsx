import { Clock, MapPin, Phone } from "lucide-react";

import { site } from "@/data/site";
import { generalOrderUrl, telUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-cocoa-800 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <Reveal className="text-center">
          <p className="eyebrow eyebrow-on-dark">Get In Touch</p>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-3xl text-cream-50 sm:text-4xl lg:text-5xl"
          >
            Craving Brownies?
          </h2>
          <div className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-base leading-relaxed text-cream-100/75 sm:text-lg">
            We&rsquo;d love to prepare something delicious for you.
          </p>
        </Reveal>

        <Reveal delay={110} className="mt-12">
          <div className="rounded-3xl border border-cocoa-600 bg-cocoa-850 p-8 sm:p-12">
            <p className="text-center font-display text-2xl tracking-wide text-gold-400 sm:text-3xl">
              {site.nameUpper}
            </p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <dt className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 text-gold-400">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  <span className="sr-only">Location</span>
                </dt>
                <dd className="mt-4 text-[0.9375rem] leading-relaxed text-cream-100/80">
                  {site.addressLine}
                </dd>
              </div>

              <div className="text-center">
                <dt className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 text-gold-400">
                  <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  <span className="sr-only">Phone</span>
                </dt>
                <dd className="mt-2">
                  <a
                    href={telUrl}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-cream-100/80 transition-colors hover:text-gold-400"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>

              <div className="text-center">
                <dt className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 text-gold-400">
                  <Clock className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  <span className="sr-only">Ordering</span>
                </dt>
                <dd className="mt-4 text-[0.9375rem] leading-relaxed text-cream-100/80">
                  Baked to order — message us to check availability
                </dd>
              </div>
            </dl>

            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <OrderButton
                href={generalOrderUrl}
                variant="whatsapp"
                size="lg"
                icon={<WhatsAppIcon className="h-5 w-5" />}
              >
                WhatsApp Us
              </OrderButton>
              <OrderButton
                href={telUrl}
                variant="outline"
                size="lg"
                external={false}
                icon={<Phone className="h-[1.125rem] w-[1.125rem]" aria-hidden />}
              >
                Call Us
              </OrderButton>
            </div>

            {/*
              GOOGLE MAPS
              ------------------------------------------------------------------
              We have not guessed a map pin for you. When you are ready:
                1. Find the shop on Google Maps
                2. Share → Embed a map → Copy HTML
                3. Paste the <iframe> here, and add
                   className="mt-10 h-72 w-full rounded-2xl border-0"
                   loading="lazy"
            */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
