"use client";
// components/home/BannerSlider.jsx
import { useState, useEffect, useCallback } from "react";
import { SLIDES } from "@/data/games";
import styles from "./BannerSlider.module.css";

export default function BannerSlider() {
  const [cur, setCur]         = useState(0);
  const [paused, setPaused]   = useState(false);

  const next = useCallback(() => setCur(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCur(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.track} style={{ transform: `translateX(-${cur * 100}%)` }}>
        {SLIDES.map((s) => (
          <div key={s.id} className={styles.slide}>
            <div className={styles.slideBg} style={{ background: s.bg }} />
            <div className={styles.slideGlow} style={{ background: s.glow }} />
            <div className={styles.shimmer} />
            <div className={styles.content}>
              <span className={styles.tag} style={{ color: s.accent, borderColor: s.accent + "44", background: s.accent + "18" }}>
                🔥 {s.tag}
              </span>
              <h2 className={styles.title} style={{ color: s.accent }}>{s.title}</h2>
              <p className={styles.sub}>{s.sub}</p>
            </div>
            {/* Decorative right element */}
            <div className={styles.deco} style={{ color: s.accent }}>
              <span>▸</span>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.nav} ${styles.navPrev}`} onClick={prev} aria-label="Previous">‹</button>
      <button className={`${styles.nav} ${styles.navNext}`} onClick={next} aria-label="Next">›</button>

      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === cur ? styles.dotActive : ""}`}
            onClick={() => setCur(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
