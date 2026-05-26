// app/page.jsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BannerSlider from "@/components/home/BannerSlider";
import GameGrid from "@/components/home/GameGrid";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <BannerSlider />
        <GameGrid />
      </main>
      <Footer />
    </>
  );
}
