"use client";
// components/topup/TopupForm.jsx
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

    // Simpan ke sessionStorage untuk halaman status
    const tx = {
      id:       genTxId(),
      game:     game.name,
      product:  product.name,
      payment:  payment.name,
      amount:   total,
      status:   "success",
      date:     new Date().toLocaleString("id-ID"),
      inputs:   form,
    };
    sessionStorage.setItem("lastTx", JSON.stringify(tx));

    // Simulasi delay (nanti ganti dengan API call)
    await new Promise(r => setTimeout(r, 1200));
    router.push(`/status?ref=${tx.id}`);
  };

  return (
    <div className={styles.root}>
      {/* Banner */}
      <div className={styles.banner}>
        <img src={game.banner} alt={game.name} className={styles.bannerImg} />
        <div className={styles.bannerOverlay} />
      </div>

      {/* Game info */}
      <div className={styles.gameInfo}>
        <img src={game.img} alt={game.name} className={styles.gameThumb} />
        <div>
          <h1 className={styles.gameName}>{game.name.toUpperCase()}</h1>
          <div className={styles.gamePub}>{game.pub}</div>
          <div className={styles.badges}>
            {game.badges.map(b => (
              <span key={b} className={styles.badge}>✓ {b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
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

          {/* Step 1 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>Masukkan Data Akun</div>
              <div className={styles.inputGrid}>
                {game.inputFields.map(f => (
                  <div key={f.key} className={styles.inputGroup}>
                    <label className={styles.inputLabel}>{f.label} :</label>
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

          {/* Step 2 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>Pilih Nominal</div>
              {game.products.length === 0 ? (
                <div className={styles.noProd}>ⓘ Produk sedang tidak tersedia.</div>
              ) : (
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
              )}
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>Pilih Pembayaran</div>
              {PAY_GROUPS.map(grp => {
                const items = PAYMENT_METHODS.filter(p => p.group === grp);
                if (!items.length) return null;
                return (
                  <PayGroup
                    key={grp}
                    group={grp}
                    items={items}
                    selected={payment}
                    onSelect={setPayment}
                  />
                );
              })}
            </div>
          </div>

          {/* Step 4 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>4</div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>Detail Kontak</div>
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

      {/* Sticky bottom bar */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyInner}>
          <div className={styles.stickyTotal}>
            <span className={styles.stickyLabel}>Total Pembayaran</span>
            <span className={styles.stickyAmount}>
              {canOrder ? rp(total) : "—"}
            </span>
          </div>
          <button
            className={styles.orderBtn}
            onClick={handleOrder}
            disabled={!canOrder || loading}
          >
            {loading ? "Memproses..." : "🛒 Pesan Sekarang!"}
          </button>
        </div>
      </div>
    </div>
  );
}
