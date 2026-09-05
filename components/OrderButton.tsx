import type { ReactNode } from "react";

type Variant = "gold" | "outline" | "whatsapp" | "cream";
type Size = "sm" | "md" | "lg";

type OrderButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Internal anchors (#menu) stay in this tab; outbound links open a new one. */
  external?: boolean;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium " +
  "transition-all duration-300 ease-out select-none " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3";

/* Every size clears the 44px minimum tap target recommended for phones. */
const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-8 text-base",
};

const variants: Record<Variant, string> = {
  gold:
    "bg-gold-500 text-cocoa-950 shadow-[0_8px_24px_-10px_rgba(201,154,85,0.7)] " +
    "hover:bg-gold-400 hover:shadow-[0_14px_34px_-12px_rgba(201,154,85,0.85)] hover:-translate-y-0.5",
  outline:
    "border border-cream-100/35 text-cream-50 backdrop-blur-sm " +
    "hover:border-gold-400 hover:text-gold-300 hover:-translate-y-0.5",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_8px_24px_-10px_rgba(37,211,102,0.65)] " +
    "hover:bg-whatsapp-dark hover:shadow-[0_14px_34px_-12px_rgba(37,211,102,0.8)] hover:-translate-y-0.5",
  cream:
    "border border-cocoa-800/15 bg-cream-50 text-cocoa-900 " +
    "hover:border-gold-500 hover:bg-cream-100 hover:-translate-y-0.5",
};

/**
 * The one button used across the whole site. Renders an anchor because every
 * action here is a link — a WhatsApp chat, a phone call or a jump to a section.
 */
export default function OrderButton({
  href,
  children,
  variant = "gold",
  size = "md",
  external = true,
  className = "",
  icon,
  ariaLabel,
}: OrderButtonProps) {
  const outbound = external && !href.startsWith("#");

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(outbound ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
    </a>
  );
}
