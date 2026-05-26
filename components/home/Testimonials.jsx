"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";

const REVIEWS = [
  { name:"Rafi A.",   game:"Mobile Legends", rating:5, text:"Cepet banget! Diamonds langsung masuk pas bayar. Udah langganan sini dari tahun lalu.", avatar:"R", color:"#4a9eff" },
  { name:"Sinta D.",  game:"Free Fire",      rating:5, text:"Harga lebih murah dari tempat lain, proses otomatis. Recommended banget buat yang sering topup!", avatar:"S", color:"#ff6b35" },
  { name:"Kevin P.",  game:"PUBG Mobile",    rating:5, text:"UC masuk dalam 30 detik. CS juga fast respon waktu ada masalah. Top!", avatar:"K", color:"#f5c518" },
  { name:"Amel R.",   game:"Genshin Impact", rating:5, text:"Pertama kali coba langsung sukses. Antarmuka web-nya juga enak dipakai.", avatar:"A", color:"#a8d8ea" },
  { name:"Dimas F.",  game:"Valorant",       rating:4, text:"VP masuk cepat, harga bersaing. Payment method lengkap, bisa QRIS.", avatar:"D", color:"#ff4655" },
  { name:"Nadia K.",  game:"Honor of Kings", rating:5, text:"Gak perlu daftar akun, langsung topup. Simpel dan aman!", avatar:"N", color:"#e8c96e" },
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
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // FIXED: hapus window.innerWidth di luar useEffect
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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

        <div className={styles.counter}>
          {[
            { num:"50.000+",  label:"Transaksi" },
            { num:"4.9 / 5",  label:"Rating" },
            { num:"99.9%",    label:"Sukses Rate" },
            { num:"< 1 Menit",label:"Rata-rata Proses" },
          ].map((c, i) => (
            <div key={i} className={styles.counterItem}>
              <span className={styles.counterNum}>{c.num}</span>
              <span className={styles.counterLabel}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
