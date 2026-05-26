"use client";
// components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandIcon}>J</span>
          <div>
            <span className={styles.brandName}>JACKSPW</span>
            <span className={styles.brandTag}>Murah &amp; Aman</span>
          </div>
        </Link>

        <div className={styles.center}>
          <Link href="/" className={styles.navLink}>Topup</Link>
          <Link href="/cek" className={styles.navLink}>Cek Transaksi</Link>
          <a href="#" className={styles.navLink}>Leaderboard</a>
          <a href="#" className={styles.navLink}>Artikel</a>
        </div>

        <div className={styles.right}>
          <Link href="/cek" className={styles.navBtn}>Cek Transaksi</Link>
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={mobileOpen ? styles.open : ""} />
            <span className={mobileOpen ? styles.open : ""} />
            <span className={mobileOpen ? styles.open : ""} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Topup</Link>
          <Link href="/cek" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Cek Transaksi</Link>
          <a href="#" className={styles.mobileLink}>Leaderboard</a>
          <a href="#" className={styles.mobileLink}>Artikel</a>
        </div>
      )}
    </>
  );
}
