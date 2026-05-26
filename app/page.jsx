// app/page.jsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BannerSlider from "@/components/home/BannerSlider";
import GameGrid from "@/components/home/GameGrid";
import HowTo from "@/components/home/HowTo";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <BannerSlider />
        <GameGrid />
        <HowTo />
        <Features />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
