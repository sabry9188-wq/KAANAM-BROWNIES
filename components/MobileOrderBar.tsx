"use client";

import { useEffect, useRef, useState } from "react";

import { generalOrderUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

/**
 * A slim ordering bar pinned to the bottom on phones.
 *
 * It stays out of the way until the hero has scrolled past, and tucks itself
 * away again once the contact section arrives — that section has its own,
 * larger WhatsApp button, and the bar would otherwise sit on top of it.
 */
export default function MobileOrderBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !atContact;

  return (
    <div
      ref={barRef}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/20 bg-cocoa-950/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-400 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={generalOrderUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? undefined : -1}
        className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp text-[0.9375rem] font-medium text-white transition-colors active:bg-whatsapp-dark"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Order on WhatsApp
      </a>
    </div>
  );
}
