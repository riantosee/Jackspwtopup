"use client";
// components/home/CTABanner.jsx
import Link from "next/link";
import styles from "./CTABanner.module.css";

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <span className={styles.eyebrow}>🎮 Siap Top Up?</span>
          <h2 className={styles.title}>Mulai Sekarang,<br/>Gratis & Tanpa Daftar</h2>
          <p className={styles.sub}>Tidak perlu buat akun. Pilih game, masukkan ID, bayar, selesai.</p>
          <div className={styles.actions}>
            <Link href="/#all-games" className={styles.btnPrim}>Top Up Sekarang</Link>
            <Link href="/cek" className={styles.btnGhost}>Cek Transaksi</Link>
          </div>
        </div>
        <div className={styles.deco}>JACKSPW</div>
      </div>
    </section>
  );
}
