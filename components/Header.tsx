"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { navLinks, site } from "@/data/site";
import { generalOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Swap the bar from transparent to solid once the hero starts scrolling away. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu on Escape, and stop the page behind it from scrolling. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-gold-500/15 bg-cocoa-950/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          {/* Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex min-h-11 shrink-0 items-center gap-2.5 sm:gap-3"
            aria-label={`${site.name} — back to top`}
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={480}
              height={472}
              priority
              className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.9375rem] font-semibold tracking-[0.16em] text-gold-400 sm:text-base">
                KAANAM
              </span>
              <span className="mt-0.5 text-[0.5625rem] font-medium tracking-[0.34em] text-cream-100/65 sm:text-[0.625rem]">
                BROWNIES
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative py-2 text-sm font-medium text-cream-100/80 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Full button on desktop, compact icon button on phones — but always present.
                The wrapper does the hiding: OrderButton sets its own `display`,
                so a `hidden` class on the button itself would not win. */}
            <span className="hidden sm:inline-flex">
              <OrderButton
                href={generalOrderUrl}
                variant="gold"
                size="sm"
                icon={<WhatsAppIcon className="h-4 w-4" />}
              >
                Order on WhatsApp
              </OrderButton>
            </span>

            <a
              href={generalOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-cocoa-950 transition-colors hover:bg-gold-400 sm:hidden"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-300 lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-cocoa-950/97 backdrop-blur-lg lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-center px-8 pb-20"
        >
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-4 border-b border-cocoa-700/60 py-5 font-display text-3xl text-cream-50 transition-colors hover:text-gold-400"
                >
                  <span className="text-xs font-sans tracking-widest text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <OrderButton
              href={generalOrderUrl}
              variant="whatsapp"
              size="lg"
              className="w-full"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Order on WhatsApp
            </OrderButton>
            <p className="mt-5 text-center font-script text-2xl text-gold-400">
              {site.script}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
