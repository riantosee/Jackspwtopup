"use client";
// app/status/page.jsx
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { rp } from "@/data/games";
import styles from "./page.module.css";

export default function StatusPage() {
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastTx");
    if (raw) setTx(JSON.parse(raw));
  }, []);

  if (!tx) return (
    <>
      <Navbar />
      <div className={styles.empty}>
        <div className={styles.emptyIco}>🔍</div>
        <div className={styles.emptyTitle}>Tidak ada transaksi</div>
        <Link href="/" className={styles.btn}>Kembali ke Beranda</Link>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.ico}>✅</div>
        <h1 className={styles.title}>PEMBAYARAN BERHASIL</h1>
        <p className={styles.sub}>
          Top up sedang diproses. Item akan masuk ke akun dalam beberapa menit.
        </p>

        <div className={styles.card}>
          <div className={styles.row}><span>Game</span><span>{tx.game}</span></div>
          <div className={styles.row}><span>Nominal</span><span>{tx.product}</span></div>
          <div className={styles.row}><span>Pembayaran</span><span>{tx.payment}</span></div>
          <div className={styles.row}><span>Tanggal</span><span>{tx.date}</span></div>
          <div className={`${styles.row} ${styles.rowTotal}`}>
            <span>Total</span><span>{rp(tx.amount)}</span>
          </div>
        </div>

        <div className={styles.txId}>
          ID Transaksi: <strong>{tx.id}</strong>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrim}>Kembali ke Beranda</Link>
          <Link href="/cek" className={styles.btnGhost}>Cek Status Transaksi</Link>
        </div>
      </main>
    </>
  );
}
