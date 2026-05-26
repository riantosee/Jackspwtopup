"use client";
// components/home/GameGrid.jsx
import { useState } from "react";
import Link from "next/link";
import { GAMES, CATEGORIES } from "@/data/games";
import styles from "./GameGrid.module.css";

export default function GameGrid() {
  const [cat, setCat]       = useState("all");
  const [search, setSearch] = useState("");

  const filtered = GAMES.filter(g => {
    const matchQ = g.name.toLowerCase().includes(search.toLowerCase()) ||
                   g.pub.toLowerCase().includes(search.toLowerCase());
    return matchQ;
  });

  return (
    <section className={styles.section}>

      {/* Ticker */}
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {[...Array(2)].flatMap((_, i) =>
            GAMES.map(g => (
              <span key={`${g.slug}-${i}`} className={styles.tickerItem}>
                <b>✦</b>{g.name}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>🎮</span>
          <div>
            <h2 className={styles.headerTitle}>SEMUA KATEGORI</h2>
            <p className={styles.headerSub}>Berikut adalah beberapa pilihan topup di store kami.</p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className={styles.catRow}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`${styles.catTab} ${cat === c.id ? styles.catActive : ""}`}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIco}>⌕</span>
        <input
          className={styles.searchInput}
          placeholder="Cari Game atau Voucher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map(g => (
          <Link
            key={g.slug}
            href={`/topup/${g.slug}`}
            className={styles.card}
            style={{ "--gc": g.color }}
          >
            {g.hot && <span className={styles.hotBadge}>Hot</span>}
            <img
              src={g.img}
              alt={g.name}
              className={styles.cardImg}
            />
            <div className={styles.cardBody}>
              <div className={styles.cardName}>{g.name}</div>
              <div className={styles.cardPub}>{g.pub}</div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          Tidak ada game yang ditemukan untuk pencarian "<strong>{search}</strong>"
        </div>
      )}
    </section>
  );
}
