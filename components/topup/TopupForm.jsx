"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PAYMENT_METHODS, rp, genTxId } from "@/data/games";
import styles from "./TopupForm.module.css";

const PAY_GROUPS = ["QRIS", "E-Wallet", "Virtual Account", "Retail"];

function PayGroup({ group, items, selected, onSelect }) {
  const [open, setOpen] = useState(group === "QRIS");
  return (
    <div className={styles.paySection}>
      <button className={styles.paySectionHead} onClick={() => setOpen(o => !o)}>
        <span className={styles.paySectionTitle}>{group}</span>
        <span className={`${styles.chevron} ${open ? styles.chevOpen : ""}`}>▾</span>
      </button>
      {open && (
        <div className={styles.payItems}>
          {items.map(p => (
            <button
              key={p.id}
              className={`${styles.payItem} ${selected?.id === p.id ? styles.payItemSel : ""}`}
              onClick={() => onSelect(p)}
            >
              <span className={styles.payIco}>{p.icon}</span>
              <span className={styles.payName}>{p.name}</span>
              {p.note && <span className={styles.payNote}>{p.note}</span>}
              <span className={`${styles.payFee} ${p.fee === 0 ? styles.payFree : ""}`}>
                {p.fee === 0 ? "Gratis" : rp(p.fee)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopupForm({ game }) {
  const router  = useRouter();
  const [tab, setTab]         = useState("tx");
  const [form, setForm]       = useState({});
  const [product, setProduct] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const canOrder = game.inputFields.every(f => form[f.key]?.trim()) && product && payment;
  const total    = (product?.price || 0) + (payment?.fee || 0);

  const handleOrder = async () => {
    if (!canOrder) return;
    setLoading(true);
    const tx = {
      id: genTxId(), game: game.name, product: product.name,
      payment: payment.name, amount: total, status: "success",
      date: new Date().toLocaleString("id-ID"), inputs: form,
    };
    sessionStorage.setItem("lastTx", JSON.stringify(tx));
    await new Promise(r => setTimeout(r, 1200));
    router.push(`/status?ref=${tx.id}`);
  };

  // Promo badge — bisa diambil dari DB nanti
  const promo = game.hot ? { label: "DISCOUNT 5%", sub: "ALL PRODUCT" } : null;

  return (
    <div className={styles.root}>

      {/* ── BANNER ── */}
      <div className={styles.bannerWrap}>
        <img src={game.banner} alt={game.name} className={styles.bannerImg} />
        <div className={styles.bannerOverlay} />
        {promo && (
          <div className={styles.promoBadge}>
            <div className={styles.promoLabel}>DISCOUNT</div>
            <div className={styles.promoValue}>5%</div>
            <div className={styles.promoSub}>ALL PRODUCT</div>
          </div>
        )}
      </div>

      {/* ── GAME INFO ── */}
      <div className={styles.gameInfo}>
        <img src={game.img} alt={game.name} className={styles.gameThumb} />
        <div className={styles.gameMeta}>
          <div className={styles.gameName}>{game.name.toUpperCase()}</div>
          <div className={styles.gamePub}>{game.pub}</div>
          <div className={styles.badges}>
            {game.badges.map(b => (
              <span key={b} className={styles.badge}>
                {b === "Proses Cepat" ? "⚡" : b === "Layanan 24/7" ? "💬" : "✔"} {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === "tx" ? styles.tabActive : ""}`} onClick={() => setTab("tx")}>
          Transaksi
        </button>
        <button className={`${styles.tab} ${tab === "info" ? styles.tabActive : ""}`} onClick={() => setTab("info")}>
          Keterangan
        </button>
      </div>

      {tab === "tx" && (
        <div className={styles.steps}>

          {/* STEP 1 */}
          <div className={styles.stepBlock}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepLabel}>Masukkan Data Akun</div>
            </div>
            <div className={styles.stepBody}>
              <div className={styles.inputGrid}>
                {game.inputFields.map(f => (
                  <div key={f.key} className={styles.inputGroup}>
                    <label className={styles.inputLabel}>{f.label}</label>
                    <input
                      className={styles.input}
                      placeholder={f.ph}
                      value={form[f.key] || ""}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className={styles.stepBlock}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepLabel}>Pilih Nominal</div>
            </div>
            <div className={styles.stepBody}>
              {game.products.length === 0
                ? <div className={styles.noProd}>ⓘ Produk sedang tidak tersedia.</div>
                : (
                  <div className={styles.prodGrid}>
                    {game.products.map(p => (
                      <button
                        key={p.sku}
                        className={`${styles.prod} ${product?.sku === p.sku ? styles.prodSel : ""}`}
                        onClick={() => setProduct(p)}
                      >
                        {product?.sku === p.sku && <span className={styles.prodCheck}>✓</span>}
                        <div className={styles.prodName}>{p.name}</div>
                        <div className={styles.prodPrice}>{rp(p.price)}</div>
                        {p.tag && <span className={styles.prodTag}>{p.tag}</span>}
                      </button>
                    ))}
                  </div>
                )
              }
            </div>
          </div>

          {/* STEP 3 */}
          <div className={styles.stepBlock}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepLabel}>Pilih Pembayaran</div>
            </div>
            <div className={styles.stepBody}>
              {PAY_GROUPS.map(grp => {
                const items = PAYMENT_METHODS.filter(p => p.group === grp);
                if (!items.length) return null;
                return <PayGroup key={grp} group={grp} items={items} selected={payment} onSelect={setPayment} />;
              })}
            </div>
          </div>

          {/* STEP 4 */}
          <div className={styles.stepBlock}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNum}>4</div>
              <div className={styles.stepLabel}>Detail Kontak</div>
            </div>
            <div className={styles.stepBody}>
              <div className={styles.kontak}>
                {!canOrder
                  ? "Belum ada item produk yang dipilih."
                  : `${game.name} · ${product.name} · ${rp(total)}`}
              </div>
            </div>
          </div>

        </div>
      )}

      {tab === "info" && (
        <div className={styles.infoTab}>
          <p>{game.desc}</p>
          <br />
          <p>Didukung oleh <strong>Digiflazz</strong> sebagai provider terpercaya. Transaksi otomatis 24/7.</p>
          <br />
          <p>Untuk bantuan lebih lanjut, hubungi CS kami melalui WhatsApp.</p>
        </div>
      )}

      {/* ── STICKY BAR ── */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyInner}>
          <div className={styles.stickyLeft}>
            <span className={styles.stickyLabel}>Total Pembayaran</span>
            <span className={styles.stickyAmount}>{canOrder ? rp(total) : "—"}</span>
          </div>
          <button className={styles.orderBtn} onClick={handleOrder} disabled={!canOrder || loading}>
            <span className={styles.orderBtnIco}>🛒</span>
            {loading ? "Memproses..." : "Pesan Sekarang!"}
          </button>
        </div>
      </div>
    </div>
  );
}
