import About from "@/components/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import FeaturedProduct from "@/components/FeaturedProduct";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import MobileOrderBar from "@/components/MobileOrderBar";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Products />
        <FeaturedProduct />
        <About />
        <HowToOrder />
        <Gallery />
        <Testimonials />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <MobileOrderBar />
    </>
  );
}
