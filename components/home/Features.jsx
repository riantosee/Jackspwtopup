"use client";
// components/home/Features.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./Features.module.css";

const FEATURES = [
  { icon:"⚡", title:"Proses Instan",      desc:"Transaksi diproses otomatis. Diamonds masuk dalam hitungan detik setelah pembayaran.",          color:"#f5c518" },
  { icon:"🔒", title:"100% Aman",          desc:"Sistem keamanan berlapis. Data kamu terenkripsi dan tidak pernah disimpan sembarangan.",          color:"#4acf7a" },
  { icon:"💰", title:"Harga Terjangkau",   desc:"Margin tipis, harga bersaing. Kami prioritaskan value terbaik untuk setiap rupiah yang kamu bayar.", color:"#c9853a" },
  { icon:"🕐", title:"24/7 Non-Stop",      desc:"Server aktif setiap saat. Top up jam 3 pagi pun tetap berjalan normal tanpa hambatan.",            color:"#4a9eff" },
  { icon:"🎮", title:"20+ Game Tersedia",  desc:"Dari MOBA, Battle Royale, RPG, hingga FPS. Semua game populer tersedia di satu platform.",         color:"#e040fb" },
  { icon:"💬", title:"CS Responsif",       desc:"Tim customer service siap bantu via WhatsApp. Respon cepat untuk setiap keluhan dan pertanyaan.",   color:"#ff6b35" },
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>✦ Kenapa JacksPW?</span>
          <h2 className={styles.title}>Keunggulan Kami</h2>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`${styles.card} ${visible ? styles.cardVisible : ""}`}
              style={{ "--fc": f.color, transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.cardIcon} style={{ background: f.color + "18", color: f.color }}>
                {f.icon}
              </div>
              <div className={styles.cardTitle}>{f.title}</div>
              <div className={styles.cardDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
