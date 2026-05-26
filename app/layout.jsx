// app/layout.jsx
import { Barlow, Barlow_Condensed, Bebas_Neue } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "JacksPW — Top Up Game Terpercaya",
  description: "Platform top up game terpercaya. Proses instan, harga terbaik, tersedia 24/7.",
  keywords: "top up, game, mobile legends, free fire, pubg, diamonds, uc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${barlow.variable} ${barlowCondensed.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}
