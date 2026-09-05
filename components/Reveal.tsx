"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, for revealing a row of cards one after another. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades its children up into place the first time they scroll into view.
 * Deliberately tiny — no animation library, no re-render (the class is added
 * straight to the node), and it stops observing once it has fired.
 *
 * The CSS honours `prefers-reduced-motion`, so this becomes a no-op for anyone
 * who has asked their device for less movement. If JavaScript never runs, the
 * <noscript> rule in app/layout.tsx keeps the content visible.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Older browsers without IntersectionObserver simply show the content.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
