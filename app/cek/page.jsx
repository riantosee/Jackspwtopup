"use client";
// app/cek/page.jsx
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { rp } from "@/data/games";
import styles from "./page.module.css";

export default function CekPage() {
  const [input, setInput]   = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    await new Promise(r => setTimeout(r, 600));

    // Cek sessionStorage (nanti ganti dengan API /api/check?code=xxx)
    const raw = sessionStorage.getItem("lastTx");
    if (raw) {
      const tx = JSON.parse(raw);
      if (tx.id === input.trim().toUpperCase()) {
        setResult({ found: true, ...tx });
        setLoading(false);
        return;
      }
    }

    setResult({ found: false });
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.backWrap}>
          <Link href="/" className={styles.back}>← Kembali</Link>
        </div>

        <h1 className={styles.title}>CEK TRANSAKSI</h1>
        <p className={styles.sub}>
          Masukkan ID transaksi untuk mengecek status pembayaran kamu.
        </p>

        <div className={styles.card}>
          <label className={styles.label}>ID Transaksi</label>
          <input
            className={styles.input}
            placeholder="Contoh: TRX-ABC123"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleCheck()}
          />
          <button
            className={styles.btn}
            onClick={handleCheck}
            disabled={!input.trim() || loading}
          >
            {loading ? "Mencari..." : "Cek Status"}
          </button>

          {result && (
            result.found ? (
              <div className={styles.resultOk}>
                <div className={styles.resultTitle}>✓ Transaksi Ditemukan</div>
                <div className={styles.resultRow}><span>Game</span><span>{result.game}</span></div>
                <div className={styles.resultRow}><span>Nominal</span><span>{result.product}</span></div>
                <div className={styles.resultRow}><span>Total</span><span>{rp(result.amount)}</span></div>
                <div className={styles.resultRow}>
                  <span>Status</span>
                  <span className={styles.statusOk}>✓ SUCCESS</span>
                </div>
              </div>
            ) : (
              <div className={styles.resultErr}>
                ✕ ID transaksi tidak ditemukan. Pastikan kode yang kamu masukkan benar.
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
