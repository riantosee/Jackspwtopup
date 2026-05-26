// components/layout/Footer.jsx
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.brand}>JACKSPW</div>
          <div className={styles.copy}>© 2025 jackspw.id · Top Up Game Terpercaya</div>
        </div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Tentang Kami</a>
          <a href="#" className={styles.link}>Syarat & Ketentuan</a>
          <a href="#" className={styles.link}>Kebijakan Privasi</a>
          <Link href="/cek" className={styles.link}>Cek Transaksi</Link>
        </div>
      </div>
    </footer>
  );
}
