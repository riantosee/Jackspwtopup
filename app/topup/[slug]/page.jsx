// app/topup/[slug]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { GAMES } from "@/data/games";
import Navbar from "@/components/layout/Navbar";
import TopupForm from "@/components/topup/TopupForm";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return GAMES.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const game = GAMES.find(g => g.slug === params.slug);
  if (!game) return {};
  return {
    title: `Top Up ${game.name} — JacksPW`,
    description: game.desc,
  };
}

export default function TopupPage({ params }) {
  const game = GAMES.find(g => g.slug === params.slug);
  if (!game) notFound();

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.backBar}>
          <Link href="/" className={styles.back}>← Kembali</Link>
        </div>
        <TopupForm game={game} />
      </main>
    </>
  );
}
