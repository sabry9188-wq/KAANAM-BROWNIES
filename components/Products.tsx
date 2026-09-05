import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function Products() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-cream-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our Brownies</p>
          <h2
            id="menu-heading"
            className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl lg:text-5xl"
          >
            Find Your Perfect Brownie
          </h2>
          <div className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-base leading-relaxed text-ink-700 sm:text-lg">
            From classic fudgy brownies to loaded chocolate creations, there is
            something for every craving.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 90} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-sm text-ink-500">
            Every box is baked to order. Message us on WhatsApp to check
            availability and collection times.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
