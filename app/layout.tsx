import type { Metadata, Viewport } from "next";
import { Inter, Parisienne, Playfair_Display } from "next/font/google";

import { products } from "@/data/products";
import { site } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "brownies Kinniya",
    "brownies Sri Lanka",
    "brownie cookies",
    "fudge brownie",
    "blondie",
    "brookies",
    "chocolate overload brownie",
    "order brownies WhatsApp",
    "Kaanam Brownies",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freshly baked fudge brownies with chocolate sauce from Kaanam Brownies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#140906",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data so Google can show the shop's name, phone, location and
 * menu prices. Everything here is real information taken from the poster —
 * there are deliberately no ratings or reviews, because there are none yet.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/og-image.jpg`,
  telephone: site.phoneIntl,
  priceRange: "Rs. 800 – Rs. 1,500",
  servesCuisine: "Desserts",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kuttikarach",
    addressLocality: `${site.addressLocality} - 5`,
    addressCountry: site.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.latitude,
    longitude: site.longitude,
  },
  hasMap: site.mapUrl,
  makesOffer: products.map((product) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `${site.url}${product.image}`,
    },
    price: product.priceValue,
    priceCurrency: "LKR",
    eligibleQuantity: {
      "@type": "QuantitativeValue",
      value: parseInt(product.quantity, 10),
      unitText: "pieces",
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${parisienne.variable}`}
    >
      <head>
        {/* Without JavaScript the scroll reveals never fire, so show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cocoa-950"
        >
          Skip to our menu
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
