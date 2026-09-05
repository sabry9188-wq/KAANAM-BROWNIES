import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
// public/images/logo.png holds the full gold lockup from the poster, if you
// ever want it — for a social or WhatsApp Business profile picture, say.

import { navLinks, site } from "@/data/site";
import { generalOrderUrl, telUrl } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="border-t border-cocoa-700/60 bg-cocoa-950 pt-16 pb-28 md:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            {/* The crest is cropped from the poster, so it carries the poster's
                dark backdrop. Keeping it circular hides that seam. */}
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-mark.png"
                alt={`${site.name} logo`}
                width={480}
                height={472}
                className="h-14 w-14 rounded-full object-cover ring-1 ring-gold-500/25"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-[0.14em] text-gold-400">
                  KAANAM
                </span>
                <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.34em] text-cream-100/60">
                  BROWNIES
                </span>
              </span>
            </div>
            <p className="mt-6 font-display text-lg text-gold-400">
              {site.tagline}
            </p>
            <p className="mt-3 font-script text-2xl text-cream-100/55">
              {site.script}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.22em] text-gold-500 uppercase">
              Quick Links
            </h2>
            {/* Generous vertical padding keeps these easy to hit on a phone. */}
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-cream-100/70 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.22em] text-gold-500 uppercase">
              Visit &amp; Order
            </h2>
            <ul className="mt-5 space-y-1 text-[0.9375rem]">
              <li>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 py-2 text-cream-100/70 transition-colors hover:text-gold-400"
                >
                  <MapPin
                    className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-gold-500"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {site.addressLine}
                </a>
              </li>
              <li>
                <a
                  href={telUrl}
                  className="flex min-h-11 items-center gap-3 text-cream-100/70 transition-colors hover:text-gold-400"
                >
                  <Phone
                    className="h-[1.125rem] w-[1.125rem] shrink-0 text-gold-500"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={generalOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-cream-100/70 transition-colors hover:text-gold-400"
                >
                  <WhatsAppIcon className="h-[1.125rem] w-[1.125rem] shrink-0 text-gold-500" />
                  Order on WhatsApp
                </a>
              </li>
            </ul>

            {/*
              SOCIAL LINKS
              ------------------------------------------------------------------
              These are placeholders, deliberately not clickable, because we do
              not have your real page addresses. To switch one on, replace the
              <span> with:
                <a href="https://instagram.com/your-handle" target="_blank"
                   rel="noopener noreferrer" aria-label="Kaanam Brownies on Instagram"
                   className="... same classes ...">
            */}
            <div className="mt-8">
              <p className="text-[0.6875rem] tracking-[0.16em] text-cream-100/35 uppercase">
                Social coming soon
              </p>
              <div className="mt-3 flex gap-3" aria-hidden>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-600 text-cream-100/30">
                  <InstagramIcon className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa-600 text-cream-100/30">
                  <FacebookIcon className="h-[1.125rem] w-[1.125rem]" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-cocoa-700/60 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[0.8125rem] text-cream-100/45">
            &copy; 2026 {site.name}. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-cream-100/45">
            {site.addressLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
