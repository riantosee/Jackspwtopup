// app/page.jsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BannerSlider from "@/components/home/BannerSlider";
import Trending from "@/components/home/Trending";
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
        <Trending />
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
