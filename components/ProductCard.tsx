import Image from "next/image";

import type { Product } from "@/data/products";
import { productOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-[var(--shadow-card)] transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-4/5 overflow-hidden bg-cream-100">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="img-zoom object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-cocoa-950/85 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-gold-300 uppercase backdrop-blur-sm">
          {product.quantity}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl text-cocoa-900 sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
          {product.description}
        </p>

        <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-cream-200 pt-5">
          <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-500 uppercase">
            {product.quantity}
          </span>
          <span className="font-display text-2xl text-cocoa-900">
            {product.priceLabel}
          </span>
        </div>

        <OrderButton
          href={productOrderUrl(product)}
          variant="gold"
          size="md"
          className="mt-5 w-full"
          icon={<WhatsAppIcon className="h-4 w-4" />}
          ariaLabel={`Order ${product.name} on WhatsApp`}
        >
          Order Now
        </OrderButton>
      </div>
    </article>
  );
}
