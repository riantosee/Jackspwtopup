"use client";
import Link from "next/link";
import { GAMES } from "@/data/games";
import styles from "./Trending.module.css";

const TRENDING = GAMES.filter(g => g.trending).slice(0, 8);

export default function Trending() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.fire}>🔥</span>
          <div>
            <h2 className={styles.title}>TRENDING</h2>
            <p className={styles.sub}>Berikut adalah beberapa produk yang paling populer saat ini.</p>
          </div>
        </div>

        <div className={styles.grid}>
          {TRENDING.map(g => (
            <Link key={g.slug} href={`/topup/${g.slug}`} className={styles.card} style={{ "--gc": g.color }}>
              <div className={styles.thumb} style={{ background: g.color + "18" }}>
                <img src={g.img} alt={g.name} className={styles.thumbImg} />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{g.name}</div>
                <div className={styles.pub}>{g.pub}</div>
              </div>
              <span className={styles.arrow}>›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
