"use client";
// components/home/Testimonials.jsx
import { useState, useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";

const REVIEWS = [
  { name:"Rafi A.",    game:"Mobile Legends", rating:5, text:"Cepet banget! Diamonds langsung masuk pas bayar. Udah langganan sini dari tahun lalu.", avatar:"R", color:"#4a9eff" },
  { name:"Sinta D.",   game:"Free Fire",      rating:5, text:"Harga lebih murah dari tempat lain, proses otomatis. Recommended banget buat yang sering topup!", avatar:"S", color:"#ff6b35" },
  { name:"Kevin P.",   game:"PUBG Mobile",    rating:5, text:"UC masuk dalam 30 detik. CS juga fast respon waktu ada masalah. Top!",   avatar:"K", color:"#f5c518" },
  { name:"Amel R.",    game:"Genshin Impact", rating:5, text:"Pertama kali coba langsung sukses. Antarmuka web-nya juga enak dipakai.", avatar:"A", color:"#a8d8ea" },
  { name:"Dimas F.",   game:"Valorant",       rating:4, text:"VP masuk cepat, harga bersaing. Payment method lengkap, bisa QRIS.",      avatar:"D", color:"#ff4655" },
  { name:"Nadia K.",   game:"Honor of Kings", rating:5, text:"Gak perlu daftar akun, langsung topup. Simpel dan aman!",                 avatar:"N", color:"#e8c96e" },
];

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? "#f5c518" : "var(--text-4)", fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [cur, setCur]       = useState(0);
  const [visible, setVisible] = useState(false);
  const ref  = useRef(null);
  const cols = typeof window !== "undefined" && window.innerWidth < 640 ? 1 : window?.innerWidth < 900 ? 2 : 3;
  const max  = Math.ceil(REVIEWS.length / (cols || 3)) - 1;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const t = setInterval(() => setCur(c => c >= max ? 0 : c + 1), 4000);
    return () => clearInterval(t);
  }, [max]);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>⭐ Dipercaya Ribuan Gamer</span>
          <h2 className={styles.title}>Apa Kata Mereka</h2>
          <div className={styles.aggregate}>
            <span className={styles.aggScore}>4.9</span>
            <div>
              <div className={styles.aggStars}>★★★★★</div>
              <div className={styles.aggCount}>dari 2.400+ ulasan</div>
            </div>
          </div>
        </div>

        <div className={`${styles.grid} ${visible ? styles.gridVisible : ""}`}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={styles.card} style={{ "--rc": r.color }}>
              <div className={styles.cardTop}>
                <div className={styles.avatar} style={{ background: r.color + "22", color: r.color }}>{r.avatar}</div>
                <div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.game}>{r.game}</div>
                </div>
                <Stars count={r.rating} />
              </div>
              <p className={styles.text}>"{r.text}"</p>
            </div>
          ))}
        </div>

        {/* Live counter */}
        <div className={styles.counter}>
          <div className={styles.counterItem}>
            <span className={styles.counterNum}>50.000+</span>
            <span className={styles.counterLabel}>Transaksi</span>
          </div>
          <div className={styles.counterDivider}/>
          <div className={styles.counterItem}>
            <span className={styles.counterNum}>4.9 / 5</span>
            <span className={styles.counterLabel}>Rating</span>
          </div>
          <div className={styles.counterDivider}/>
          <div className={styles.counterItem}>
            <span className={styles.counterNum}>99.9%</span>
            <span className={styles.counterLabel}>Sukses Rate</span>
          </div>
          <div className={styles.counterDivider}/>
          <div className={styles.counterItem}>
            <span className={styles.counterNum}>&lt; 1 Menit</span>
            <span className={styles.counterLabel}>Rata-rata Proses</span>
          </div>
        </div>
      </div>
    </section>
  );
}
