import { generalOrderUrl } from "@/lib/whatsapp";
import OrderButton from "./OrderButton";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

const steps = [
  {
    n: "01",
    title: "Choose Your Favourite",
    body: "Pick your favourite brownies from our menu.",
  },
  {
    n: "02",
    title: "Message Us",
    body: "Send your order through WhatsApp.",
  },
  {
    n: "03",
    title: "Enjoy",
    body: "We prepare your order fresh and get it ready for you.",
  },
];

export default function HowToOrder() {
  return (
    <section
      aria-labelledby="order-heading"
      className="bg-cocoa-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-on-dark">How To Order</p>
          <h2
            id="order-heading"
            className="mt-4 font-display text-3xl text-cream-50 sm:text-4xl lg:text-5xl"
          >
            Three steps to fresh brownies
          </h2>
          <div className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-base leading-relaxed text-cream-100/70 sm:text-lg">
            No accounts, no forms. Just send us a message and we will take care
            of the rest.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 sm:gap-8 md:grid-cols-3">
          {/* Connector line, desktop only. */}
          <div
            aria-hidden
            className="absolute top-8 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-gold-600/40 to-transparent md:block"
          />

          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 110} as="li" className="relative text-center">
              <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/40 bg-cocoa-850 font-display text-lg text-gold-400">
                {step.n}
              </span>
              <h3 className="mt-6 font-display text-xl text-cream-50 sm:text-2xl">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-cream-100/65">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 text-center">
          <OrderButton
            href={generalOrderUrl}
            variant="whatsapp"
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Order on WhatsApp
          </OrderButton>
        </Reveal>
      </div>
    </section>
  );
}
