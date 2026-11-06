import Image from "next/image";

import { cakePhotos, cakeStyles, occasions } from "@/data/cakes";
import { cakeOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function CelebrationCakes() {
  return (
    <section id="cakes" aria-labelledby="cakes-heading" className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Made to Order</p>
          <h2
            id="cakes-heading"
            className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl lg:text-5xl"
          >
            Celebration Brownie Cakes
          </h2>
          <div className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-base leading-relaxed text-ink-700 sm:text-lg">
            Birthdays, anniversaries and bridal showers. Tell us the size, the
            date and the name or message, and we will make it for you.
          </p>
        </Reveal>

        {/* Styles and starting prices */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(cakeStyles).map((style) => (
            <div
              key={style.name}
              className="flex flex-col rounded-2xl border border-cream-200 bg-white p-5 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-lg text-cocoa-900">{style.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-700">
                {style.description}
              </p>
              <p className="mt-3 font-display text-xl text-gold-600">
                {style.fromPrice ?? "Price on request"}
              </p>
            </div>
          ))}
        </div>

        {/* One block per occasion, each with its own heading */}
        {occasions.map((occasion) => {
          const photos = cakePhotos.filter((p) => p.occasions.includes(occasion.id));
          if (photos.length === 0) return null;
          return (
            <div key={occasion.id} className="mt-14">
              <h3 className="flex items-center gap-4 font-display text-2xl text-cocoa-900 sm:text-3xl">
                {occasion.label} Cakes
                <span className="h-px flex-1 bg-gold-500/40" aria-hidden />
              </h3>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {photos.map((photo) => {
                  const style = cakeStyles[photo.style];
                  return (
                    <li key={photo.src}>
                      <a
                        href={cakeOrderUrl(style.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order a ${style.name} like this on WhatsApp`}
                        className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-cocoa-900 shadow-[var(--shadow-card)]"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="img-zoom object-cover"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-950/90 via-cocoa-950/50 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
                          <span className="block text-xs font-medium text-cream-50 sm:text-sm">
                            {style.name}
                          </span>
                          <span className="mt-0.5 block text-[0.6875rem] text-gold-300 sm:text-xs">
                            Tap to order this style
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm text-ink-500">
            Every cake is made to your size and message, so the final price
            depends on your order. Please order a few days ahead.
          </p>
          <OrderButton
            href={cakeOrderUrl()}
            variant="whatsapp"
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Order a Celebration Cake
          </OrderButton>
        </Reveal>
      </div>
    </section>
  );
}
