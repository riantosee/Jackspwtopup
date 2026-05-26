"use client";
// components/home/HowTo.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./HowTo.module.css";

const STEPS = [
  { num:"01", icon:"🎮", title:"Pilih Game",      desc:"Cari game yang ingin kamu top up dari ratusan pilihan yang tersedia." },
  { num:"02", icon:"🔑", title:"Masukkan ID",     desc:"Input User ID akun game kamu. Pastikan ID benar sebelum lanjut." },
  { num:"03", icon:"💎", title:"Pilih Nominal",   desc:"Pilih nominal diamonds, UC, atau currency game sesuai kebutuhan." },
  { num:"04", icon:"💳", title:"Bayar",           desc:"Pilih metode pembayaran favoritmu — QRIS, e-wallet, atau transfer bank." },
  { num:"05", icon:"⚡", title:"Terima Instan",   desc:"Item langsung masuk ke akun game dalam hitungan detik hingga menit." },
];

export default function HowTo() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} id="how" ref={ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>⚡ Simple &amp; Cepat</span>
          <h2 className={styles.title}>Cara Top Up</h2>
          <p className={styles.sub}>Proses mudah dalam 5 langkah. Tidak perlu daftar akun.</p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`${styles.step} ${visible ? styles.stepVisible : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={styles.stepLine} />
              <div className={styles.stepTop}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
              </div>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
