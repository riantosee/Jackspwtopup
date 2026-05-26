"use client";
// app/admin/page.jsx — JacksPW Admin Dashboard (Full)

import { useState } from "react";

// ── DATA ─────────────────────────────────────────────────────
const DUMMY_TX = [
  { id:"TRX-A1B2C3", game:"Mobile Legends", product:"514 Diamonds", amount:107000, method:"QRIS",     status:"success",    date:"2025-05-25 14:32", user:"081234567890" },
  { id:"TRX-D4E5F6", game:"Free Fire",       product:"355 Diamonds", amount:72000,  method:"DANA",     status:"success",    date:"2025-05-25 14:18", user:"081298765432" },
  { id:"TRX-G7H8I9", game:"PUBG Mobile",     product:"325 UC",       amount:69000,  method:"BCA VA",   status:"pending",    date:"2025-05-25 14:05", user:"082345678901" },
  { id:"TRX-J1K2L3", game:"Genshin Impact",  product:"980 Genesis",  amount:215000, method:"GoPay",    status:"success",    date:"2025-05-25 13:52", user:"083456789012" },
  { id:"TRX-M4N5O6", game:"Valorant",        product:"1000 VP",      amount:100000, method:"QRIS",     status:"failed",     date:"2025-05-25 13:40", user:"084567890123" },
  { id:"TRX-P7Q8R9", game:"Mobile Legends",  product:"172 Diamonds", amount:37000,  method:"OVO",      status:"success",    date:"2025-05-25 13:28", user:"085678901234" },
  { id:"TRX-S1T2U3", game:"Free Fire",       product:"70 Diamonds",  amount:15000,  method:"Alfamart", status:"success",    date:"2025-05-25 13:10", user:"086789012345" },
  { id:"TRX-V4W5X6", game:"PUBG Mobile",     product:"660 UC",       amount:137000, method:"Mandiri",  status:"processing", date:"2025-05-25 12:55", user:"087890123456" },
];

const DUMMY_PRODUCTS = [
  { sku:"ml-86",   game:"Mobile Legends", name:"86 Diamonds",   hpp:17000,  sell:19000,  active:true,  sold:342 },
  { sku:"ml-172",  game:"Mobile Legends", name:"172 Diamonds",  hpp:33000,  sell:37000,  active:true,  sold:218 },
  { sku:"ml-514",  game:"Mobile Legends", name:"514 Diamonds",  hpp:97000,  sell:107000, active:true,  sold:891 },
  { sku:"ml-2195", game:"Mobile Legends", name:"2195 Diamonds", hpp:396000, sell:435000, active:true,  sold:156 },
  { sku:"ff-355",  game:"Free Fire",      name:"355 Diamonds",  hpp:65000,  sell:72000,  active:true,  sold:634 },
  { sku:"ff-720",  game:"Free Fire",      name:"720 Diamonds",  hpp:132000, sell:145000, active:true,  sold:287 },
  { sku:"pg-325",  game:"PUBG Mobile",    name:"325 UC",        hpp:62000,  sell:69000,  active:true,  sold:445 },
  { sku:"gi-980",  game:"Genshin Impact", name:"980 Genesis",   hpp:196000, sell:215000, active:false, sold:89  },
];

const REVENUE_CHART = [
  { day:"Sen", rev:842000,  tx:12 },
  { day:"Sel", rev:1240000, tx:18 },
  { day:"Rab", rev:980000,  tx:14 },
  { day:"Kam", rev:1560000, tx:22 },
  { day:"Jum", rev:2100000, tx:31 },
  { day:"Sab", rev:1890000, tx:27 },
  { day:"Min", rev:1340000, tx:19 },
];

const INIT_BANNERS = [
  { id:1, title:"MLBB × NARUTO",        tag:"Kolaborasi",   bg:"#050d1a", accent:"#4a9eff", active:true,  order:1 },
  { id:2, title:"FREE FIRE BOOYAH DAY", tag:"Event",        bg:"#130800", accent:"#ff6b35", active:true,  order:2 },
  { id:3, title:"GENSHIN 5.0 UPDATE",   tag:"Flash Sale",   bg:"#06081a", accent:"#a8d8ea", active:false, order:3 },
  { id:4, title:"HEMAT 15% SEMUA",      tag:"Promo Weekend",bg:"#050f08", accent:"#4acf7a", active:true,  order:4 },
];

const INIT_ADS = [
  { id:1, name:"Banner Hero Homepage",    placement:"Homepage Hero",    type:"image",   status:"active",  clicks:1240, views:18400, start:"2025-05-01", end:"2025-05-31" },
  { id:2, name:"Sidebar MLBB Promo",      placement:"Sidebar Kanan",    type:"image",   status:"active",  clicks:320,  views:5600,  start:"2025-05-15", end:"2025-06-15" },
  { id:3, name:"Pop-up Flash Sale",       placement:"Pop-up",           type:"popup",   status:"paused",  clicks:89,   views:2100,  start:"2025-05-20", end:"2025-05-25" },
  { id:4, name:"Ticker Text Promo",       placement:"Ticker Bar",       type:"text",    status:"active",  clicks:0,    views:32000, start:"2025-05-01", end:"2025-06-30" },
];

const INIT_VOUCHERS = [
  { id:1, code:"JACKSFREE",  type:"percent", value:10, minTx:50000,  maxDisc:15000, used:42,  quota:100, active:true,  exp:"2025-06-30" },
  { id:2, code:"NEWUSER",    type:"flat",    value:5000, minTx:20000, maxDisc:5000,  used:118, quota:200, active:true,  exp:"2025-12-31" },
  { id:3, code:"RAMADAN25",  type:"percent", value:15, minTx:100000, maxDisc:25000, used:200, quota:200, active:false, exp:"2025-05-10" },
  { id:4, code:"MLBBDAY",    type:"flat",    value:8000, minTx:30000, maxDisc:8000,  used:55,  quota:500, active:true,  exp:"2025-07-31" },
];

const INIT_PROMOS = [
  { id:1, name:"Flash Sale Jumat",       game:"Semua Game",    discount:10, type:"percent", active:true,  start:"2025-05-23", end:"2025-05-30", used:234 },
  { id:2, name:"Bonus MLBB Weekday",     game:"Mobile Legends",discount:5000, type:"flat",  active:true,  start:"2025-05-01", end:"2025-05-31", used:89  },
  { id:3, name:"Double Diamond FF",      game:"Free Fire",     discount:0,  type:"bonus",   active:false, start:"2025-04-01", end:"2025-04-30", used:412 },
  { id:4, name:"Cashback QRIS",          game:"Semua Game",    discount:3,  type:"cashback",active:true,  start:"2025-05-15", end:"2025-06-15", used:156 },
];

const rp = n => "Rp " + Number(n).toLocaleString("id-ID");
const maxRev = Math.max(...REVENUE_CHART.map(d => d.rev));

// ── HELPERS ──────────────────────────────────────────────────
function StatusBadge({ status }) {
  const MAP = {
    success:  { label:"Sukses",  bg:"#0d2010", color:"#4acf7a" },
    pending:  { label:"Pending", bg:"#201a08", color:"#f5c518" },
    processing:{ label:"Proses", bg:"#0d1828", color:"#4a9eff" },
    failed:   { label:"Gagal",   bg:"#200d0d", color:"#ef5050" },
    active:   { label:"Aktif",   bg:"#0d2010", color:"#4acf7a" },
    paused:   { label:"Paused",  bg:"#201a08", color:"#f5c518" },
    inactive: { label:"Nonaktif",bg:"#181818", color:"#555560" },
  };
  const s = MAP[status] || MAP.inactive;
  return (
    <span style={{
      background:s.bg, color:s.color,
      border:`1px solid ${s.color}28`,
      fontFamily:"var(--fc)", fontSize:9,
      letterSpacing:"1.5px", textTransform:"uppercase",
      padding:"3px 8px", borderRadius:3,
      display:"inline-flex", alignItems:"center", gap:5,
      whiteSpace:"nowrap",
    }}>
      <span style={{ width:5,height:5,borderRadius:"50%",background:s.color,display:"inline-block",flexShrink:0 }}/>
      {s.label}
    </span>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label style={{ position:"relative",width:36,height:20,display:"inline-block",flexShrink:0 }}>
      <input type="checkbox" checked={checked} onChange={onChange}
        style={{ opacity:0,width:0,height:0,position:"absolute" }} />
      <span style={{
        position:"absolute",inset:0,
        background: checked ? "var(--accent)" : "var(--bg4)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border2)"}`,
        borderRadius:10, cursor:"pointer", transition:"all .2s",
      }}>
        <span style={{
          position:"absolute", width:14,height:14,
          borderRadius:"50%",
          background: checked ? "#0c0c0e" : "var(--t3)",
          top:2, left: checked ? 18 : 2,
          transition:"left .2s",
        }}/>
      </span>
    </label>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,.7)",
      zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",
      padding:16,
    }} onClick={onClose}>
      <div style={{
        background:"var(--bg2)",border:"1px solid var(--border2)",
        borderRadius:10,padding:24,width:"100%",maxWidth:520,
        maxHeight:"90vh",overflowY:"auto",
      }} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <span style={{fontFamily:"var(--fd)",fontSize:15,fontWeight:700,color:"var(--text)"}}>{title}</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--t2)",fontSize:18,lineHeight:1}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── CSS ──────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0c0c0e;--bg2:#111114;--bg3:#161619;--bg4:#1c1c20;
  --border:#222228;--border2:#2c2c34;
  --accent:#e8a838;--accent2:#f0c060;
  --text:#f0ece4;--t2:#9090a0;--t3:#555560;--t4:#333340;
  --success:#4acf7a;--warn:#f5c518;--err:#ef5050;--info:#4a9eff;
  --fd:'Syne',sans-serif;--fb:'DM Sans',sans-serif;--fc:'DM Mono',monospace;
}
body{background:var(--bg);color:var(--text);font-family:var(--fb);-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
button{cursor:pointer;font-family:var(--fb)}
input,select,textarea{font-family:var(--fb)}

.shell{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
.sb{width:220px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;transition:width .2s;overflow:hidden}
.sb.col{width:56px}
.sb-top{padding:18px 14px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
.sb-ico{width:28px;height:28px;background:var(--accent);border-radius:5px;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:16px;color:#0c0c0e;font-weight:800;flex-shrink:0}
.sb-name{font-family:var(--fd);font-size:16px;font-weight:800;color:var(--text);white-space:nowrap}
.sb-tag{font-family:var(--fc);font-size:9px;letter-spacing:2px;color:var(--t3);white-space:nowrap;margin-top:1px}
.sb-nav{flex:1;padding:10px 8px;display:flex;flex-direction:column;gap:1px;overflow-y:auto}
.sb-sep{height:1px;background:var(--border);margin:6px 2px}
.sb-group{font-family:var(--fc);font-size:8px;letter-spacing:2.5px;text-transform:uppercase;color:var(--t4);padding:4px 10px 2px;white-space:nowrap;overflow:hidden}
.sb-link{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:5px;background:none;border:none;font-size:12px;color:var(--t2);transition:all .12s;white-space:nowrap;text-align:left;width:100%}
.sb-link:hover{background:var(--bg3);color:var(--text)}
.sb-link.act{background:var(--bg4);color:var(--accent)}
.sb-link-i{font-size:15px;flex-shrink:0;width:18px;text-align:center}
.sb-link-l{font-size:12px;font-weight:500}
.sb-bot{padding:10px 8px 14px;border-top:1px solid var(--border)}
.sb-tog{width:100%;background:none;border:1px solid var(--border);padding:6px;border-radius:4px;color:var(--t3);font-size:13px;transition:all .15s}
.sb-tog:hover{border-color:var(--border2);color:var(--t2)}

/* TOPBAR */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.tbar{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;background:var(--bg2);border-bottom:1px solid var(--border);flex-shrink:0}
.tbar-title{font-family:var(--fd);font-size:17px;font-weight:700;color:var(--text)}
.tbar-r{display:flex;align-items:center;gap:10px}
.tbar-badge{background:var(--bg3);border:1px solid var(--border);font-family:var(--fc);font-size:9px;letter-spacing:1px;color:var(--t2);padding:4px 10px;border-radius:3px}
.tbar-av{width:30px;height:30px;background:var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:13px;font-weight:800;color:#0c0c0e}

/* CONTENT */
.cnt{flex:1;overflow-y:auto;padding:18px 20px}

/* STAT GRID */
.stat-g{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}
@media(max-width:900px){.stat-g{grid-template-columns:repeat(2,1fr)}}
.sc{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:16px;position:relative;overflow:hidden}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--sc,var(--accent))}
.sc-l{font-family:var(--fc);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:8px}
.sc-v{font-family:var(--fd);font-size:24px;font-weight:800;color:var(--text);line-height:1}
.sc-s{font-size:11px;color:var(--t3);margin-top:5px}
.sc-i{position:absolute;bottom:10px;right:12px;font-size:26px;opacity:.07}

/* CHART */
.chart{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:16px}
.chart-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.chart-ht{font-family:var(--fd);font-size:13px;font-weight:700;color:var(--text)}
.bars{display:flex;align-items:flex-end;gap:6px;height:110px}
.bar-w{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;height:100%}
.bar-t{flex:1;width:100%;background:var(--bg3);border-radius:3px;position:relative;overflow:hidden}
.bar-f{position:absolute;bottom:0;left:0;right:0;border-radius:3px;background:linear-gradient(to top,var(--accent),var(--accent2));transition:height .5s ease}
.bar-d{font-family:var(--fc);font-size:8px;letter-spacing:1px;color:var(--t3);text-transform:uppercase}

/* 2-COL */
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
@media(max-width:800px){.two{grid-template-columns:1fr}}

/* PANEL */
.panel{background:var(--bg2);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:14px}
.ph{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid var(--border)}
.pt{font-family:var(--fd);font-size:13px;font-weight:700;color:var(--text)}
.ps{font-family:var(--fc);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3)}

/* TABLE */
.t{width:100%;border-collapse:collapse}
.t th{font-family:var(--fc);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--t3);padding:9px 14px;text-align:left;border-bottom:1px solid var(--border);background:var(--bg3);white-space:nowrap}
.t td{padding:9px 14px;border-bottom:1px solid var(--border);font-size:12px;color:var(--t2);vertical-align:middle}
.t tr:last-child td{border-bottom:none}
.t tr:hover td{background:rgba(255,255,255,.012)}
.tid{font-family:var(--fc);font-size:10px;color:var(--accent)}
.tg{color:var(--text);font-weight:500;font-size:12px}
.ta{font-family:var(--fc);font-size:11px;color:var(--text)}
.tc{font-family:var(--fc);font-size:11px;color:var(--info);letter-spacing:1px}

/* FILTER */
.fb{display:flex;gap:7px;margin-bottom:12px;flex-wrap:wrap;align-items:center}
.fi{background:var(--bg3);border:1px solid var(--border);color:var(--text);font-size:12px;padding:7px 12px;border-radius:4px;outline:none;flex:1;min-width:160px;transition:border-color .15s}
.fi:focus{border-color:rgba(232,168,56,.4)}
.fi::placeholder{color:var(--t4)}
.fbtn{background:var(--bg3);border:1px solid var(--border);font-family:var(--fc);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t2);padding:7px 12px;border-radius:4px;transition:all .12s;white-space:nowrap}
.fbtn:hover,.fbtn.on{background:var(--bg4);border-color:var(--accent);color:var(--accent)}

/* FIELDS */
.fld{display:flex;flex-direction:column;gap:5px}
.flbl{font-family:var(--fc);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--t3)}
.finp{background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--fc);font-size:12px;padding:9px 12px;border-radius:4px;outline:none;transition:border-color .15s;width:100%}
.finp:focus{border-color:rgba(232,168,56,.4)}
.finp::placeholder{color:var(--t4)}
select.finp option{background:var(--bg3)}
.frow{display:flex;gap:8px;align-items:center}
.frow .finp{flex:1}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:500px){.fg{grid-template-columns:1fr}}

/* BUTTONS */
.btn-p{background:var(--accent);border:none;font-family:var(--fd);font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0c0c0e;padding:10px 20px;border-radius:5px;transition:all .15s}
.btn-p:hover{background:var(--accent2)}
.btn-p:disabled{opacity:.3;cursor:not-allowed}
.btn-o{background:none;border:1px solid var(--border2);font-family:var(--fc);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t2);padding:7px 12px;border-radius:4px;transition:all .12s}
.btn-o:hover{border-color:var(--accent);color:var(--accent)}
.btn-d{background:none;border:1px solid #3a1515;font-family:var(--fc);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--err);padding:7px 12px;border-radius:4px;transition:all .12s}
.btn-d:hover{background:#200d0d}
.btn-row{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}

/* SETTINGS */
.s-sec{background:var(--bg2);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:12px}
.s-h{display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid var(--border)}
.s-hi{font-size:14px;color:var(--accent)}
.s-ht{font-family:var(--fd);font-size:13px;font-weight:700;color:var(--text)}
.s-b{padding:16px;display:flex;flex-direction:column;gap:12px}
.tog-r{display:flex;align-items:center;justify-content:space-between;padding:4px 0}
.tog-l{font-size:13px;color:var(--t2)}
.tog-s{font-size:11px;color:var(--t3);margin-top:1px}
.key-btn{background:none;border:1px solid var(--border);color:var(--t3);font-size:10px;padding:8px 10px;border-radius:4px;transition:all .12s;flex-shrink:0;white-space:nowrap}
.key-btn:hover{border-color:var(--border2);color:var(--t2)}

/* SALDO */
.sal-card{background:linear-gradient(135deg,#1a1408,#201a08);border:1px solid #3a2a10;border-radius:8px;padding:20px;margin-bottom:12px;position:relative;overflow:hidden}
.sal-card::before{content:'';position:absolute;top:-30px;right:-30px;width:110px;height:110px;background:var(--accent);opacity:.06;border-radius:50%}
.sal-l{font-family:var(--fc);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:5px}
.sal-v{font-family:var(--fd);font-size:34px;font-weight:800;color:var(--accent);line-height:1;margin-bottom:4px}
.sal-s{font-size:11px;color:var(--t3);font-weight:300}
.sal-w{background:#200d0d;border:1px solid #3a1515;border-radius:4px;padding:9px 12px;font-size:11px;color:#ef8080;margin-top:10px}

/* ITEM ROW */
.ir{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)}
.ir:last-child{border-bottom:none}
.ir:hover{background:rgba(255,255,255,.012)}

/* FLASH */
.flash{position:fixed;top:16px;right:16px;background:#0d2010;border:1px solid var(--success);color:var(--success);font-family:var(--fc);font-size:10px;letter-spacing:1px;padding:9px 16px;border-radius:4px;z-index:999;animation:fi .2s ease}
@keyframes fi{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}

/* VOUCHER CARD */
.vcard{background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:14px 16px;position:relative;overflow:hidden}
.vcard::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--vc,var(--accent));border-radius:2px 0 0 2px}
.vcode{font-family:var(--fc);font-size:14px;font-weight:500;color:var(--accent);letter-spacing:2px;margin-bottom:4px}
.vinfo{font-size:11px;color:var(--t3);line-height:1.6}
.vbadge{position:absolute;top:10px;right:12px}

/* PROMO CARD */
.pcard{background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:14px 16px;position:relative}
.pname{font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px}
.pgame{font-family:var(--fc);font-size:10px;letter-spacing:.5px;color:var(--t3);margin-bottom:6px}
.pdis{font-family:var(--fd);font-size:20px;font-weight:800;color:var(--accent)}

/* AD CARD */
.ad-stats{display:flex;gap:16px;margin-top:6px}
.ad-stat{display:flex;flex-direction:column;gap:1px}
.ad-stat-v{font-family:var(--fc);font-size:12px;color:var(--text);font-weight:500}
.ad-stat-l{font-family:var(--fc);font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3)}

.tag-ok{font-family:var(--fc);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;background:#0d2010;color:var(--success);border:1px solid #1a3a20;padding:2px 7px;border-radius:2px}
.tag-w{font-family:var(--fc);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;background:#201a08;color:var(--warn);border:1px solid #3a3010;padding:2px 7px;border-radius:2px}
`;

// ── NAV CONFIG ────────────────────────────────────────────────
const NAV_GROUPS = [
  { group:"Core", items:[
    { id:"overview",     icon:"▦", label:"Overview" },
    { id:"transactions", icon:"↔", label:"Transaksi" },
    { id:"products",     icon:"◈", label:"Produk" },
  ]},
  { group:"Marketing", items:[
    { id:"banners",  icon:"▣", label:"Banner & Slider" },
    { id:"ads",      icon:"◉", label:"Manajemen Iklan" },
    { id:"vouchers", icon:"◇", label:"Voucher" },
    { id:"promos",   icon:"✦", label:"Promo & Diskon" },
  ]},
  { group:"Keuangan", items:[
    { id:"saldo", icon:"◎", label:"Saldo & Deposit" },
  ]},
  { group:"Sistem", items:[
    { id:"settings", icon:"⚙", label:"Pengaturan" },
  ]},
];

const TITLES = {
  overview:"Overview", transactions:"Transaksi", products:"Produk",
  banners:"Banner & Slider", ads:"Manajemen Iklan",
  vouchers:"Voucher", promos:"Promo & Diskon",
  saldo:"Saldo & Deposit", settings:"Pengaturan",
};

// ── APP ───────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [page, setPage]     = useState("overview");
  const [col, setCol]       = useState(false);
  const [flash, setFlash]   = useState("");
  const [modal, setModal]   = useState(null); // "add-voucher" | "add-promo" | "add-ad" | "add-banner"

  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [banners,  setBanners]  = useState(INIT_BANNERS);
  const [ads,      setAds]      = useState(INIT_ADS);
  const [vouchers, setVouchers] = useState(INIT_VOUCHERS);
  const [promos,   setPromos]   = useState(INIT_PROMOS);
  const [txFilter, setTxFilter] = useState("all");
  const [txSearch, setTxSearch] = useState("");
  const [showKey,  setShowKey]  = useState({});
  const [prodEdit, setProdEdit] = useState(null);
  const [settings, setSettings] = useState({
    siteName:"JacksPW", siteUrl:"https://jackspw.id",
    digiUsername:"jackspw_user", digiKey:"••••••••••••••••",
    tripayKey:"••••••••••••••••", tripayPrivate:"••••••••••••••••",
    tripayMerchant:"T12345", marginDefault:"5",
    maintenanceMode:false, autoRefund:true,
    notifEmail:"admin@jackspw.id", digiBalance:2450000,
  });

  // Form states
  const [vForm, setVForm] = useState({ code:"", type:"percent", value:"", minTx:"", maxDisc:"", quota:"", exp:"" });
  const [pForm, setPForm] = useState({ name:"", game:"Semua Game", type:"percent", discount:"", start:"", end:"" });
  const [aForm, setAForm] = useState({ name:"", placement:"Homepage Hero", type:"image", start:"", end:"" });
  const [bForm, setBForm] = useState({ title:"", tag:"", bg:"#050d1a", accent:"#4a9eff" });

  const showFlash = (msg) => { setFlash(msg); setTimeout(() => setFlash(""), 2200); };

  const txFiltered = DUMMY_TX.filter(t => {
    const ms = txFilter === "all" || t.status === txFilter;
    const mq = t.id.toLowerCase().includes(txSearch.toLowerCase()) ||
               t.game.toLowerCase().includes(txSearch.toLowerCase()) ||
               t.user.includes(txSearch);
    return ms && mq;
  });

  const totalRev   = DUMMY_TX.filter(t=>t.status==="success").reduce((a,b)=>a+b.amount,0);
  const successCnt = DUMMY_TX.filter(t=>t.status==="success").length;
  const failedCnt  = DUMMY_TX.filter(t=>t.status==="failed").length;

  return (
    <>
      <style>{CSS}</style>
      {flash && <div className="flash">✓ {flash}</div>}

      {/* MODALS */}
      {modal === "add-voucher" && (
        <Modal title="Tambah Voucher" onClose={() => setModal(null)}>
          <div className="fg" style={{ gap:12, display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">Kode Voucher</label>
              <input className="finp" placeholder="CONTOH123" value={vForm.code}
                onChange={e => setVForm(f=>({...f,code:e.target.value.toUpperCase()}))} />
            </div>
            <div className="fld">
              <label className="flbl">Tipe Diskon</label>
              <select className="finp" value={vForm.type} onChange={e=>setVForm(f=>({...f,type:e.target.value}))}>
                <option value="percent">Persen (%)</option>
                <option value="flat">Nominal (Rp)</option>
              </select>
            </div>
            <div className="fld">
              <label className="flbl">{vForm.type==="percent" ? "Besar Diskon (%)" : "Nominal Diskon (Rp)"}</label>
              <input className="finp" type="number" placeholder={vForm.type==="percent" ? "10" : "5000"}
                value={vForm.value} onChange={e=>setVForm(f=>({...f,value:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Min. Transaksi (Rp)</label>
              <input className="finp" type="number" placeholder="50000" value={vForm.minTx}
                onChange={e=>setVForm(f=>({...f,minTx:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Maks. Diskon (Rp)</label>
              <input className="finp" type="number" placeholder="15000" value={vForm.maxDisc}
                onChange={e=>setVForm(f=>({...f,maxDisc:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Kuota</label>
              <input className="finp" type="number" placeholder="100" value={vForm.quota}
                onChange={e=>setVForm(f=>({...f,quota:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Tanggal Expired</label>
              <input className="finp" type="date" value={vForm.exp}
                onChange={e=>setVForm(f=>({...f,exp:e.target.value}))} />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn-p" onClick={() => {
              if (!vForm.code || !vForm.value) return;
              setVouchers(v => [...v, { id:Date.now(), code:vForm.code, type:vForm.type,
                value:Number(vForm.value), minTx:Number(vForm.minTx)||0,
                maxDisc:Number(vForm.maxDisc)||Number(vForm.value),
                used:0, quota:Number(vForm.quota)||100,
                active:true, exp:vForm.exp||"2025-12-31" }]);
              setModal(null); showFlash("Voucher berhasil ditambahkan");
              setVForm({ code:"",type:"percent",value:"",minTx:"",maxDisc:"",quota:"",exp:"" });
            }}>Simpan Voucher</button>
            <button className="btn-o" onClick={() => setModal(null)}>Batal</button>
          </div>
        </Modal>
      )}

      {modal === "add-promo" && (
        <Modal title="Tambah Promo" onClose={() => setModal(null)}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">Nama Promo</label>
              <input className="finp" placeholder="Flash Sale Jumat" value={pForm.name}
                onChange={e=>setPForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Game</label>
              <select className="finp" value={pForm.game} onChange={e=>setPForm(f=>({...f,game:e.target.value}))}>
                <option>Semua Game</option>
                <option>Mobile Legends</option>
                <option>Free Fire</option>
                <option>PUBG Mobile</option>
                <option>Genshin Impact</option>
                <option>Valorant</option>
              </select>
            </div>
            <div className="fld">
              <label className="flbl">Tipe Promo</label>
              <select className="finp" value={pForm.type} onChange={e=>setPForm(f=>({...f,type:e.target.value}))}>
                <option value="percent">Diskon %</option>
                <option value="flat">Diskon Nominal</option>
                <option value="cashback">Cashback</option>
                <option value="bonus">Bonus Item</option>
              </select>
            </div>
            <div className="fld">
              <label className="flbl">{pForm.type==="flat" ? "Nominal (Rp)" : "Nilai (%)"}</label>
              <input className="finp" type="number" placeholder="10" value={pForm.discount}
                onChange={e=>setPForm(f=>({...f,discount:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Tanggal Mulai</label>
              <input className="finp" type="date" value={pForm.start}
                onChange={e=>setPForm(f=>({...f,start:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Tanggal Berakhir</label>
              <input className="finp" type="date" value={pForm.end}
                onChange={e=>setPForm(f=>({...f,end:e.target.value}))} />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn-p" onClick={() => {
              if (!pForm.name) return;
              setPromos(p => [...p, { id:Date.now(), name:pForm.name, game:pForm.game,
                type:pForm.type, discount:Number(pForm.discount)||0,
                active:true, start:pForm.start, end:pForm.end, used:0 }]);
              setModal(null); showFlash("Promo berhasil ditambahkan");
              setPForm({ name:"",game:"Semua Game",type:"percent",discount:"",start:"",end:"" });
            }}>Simpan Promo</button>
            <button className="btn-o" onClick={() => setModal(null)}>Batal</button>
          </div>
        </Modal>
      )}

      {modal === "add-ad" && (
        <Modal title="Tambah Iklan" onClose={() => setModal(null)}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">Nama Iklan</label>
              <input className="finp" placeholder="Banner Hero Ramadan" value={aForm.name}
                onChange={e=>setAForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Penempatan</label>
              <select className="finp" value={aForm.placement} onChange={e=>setAForm(f=>({...f,placement:e.target.value}))}>
                <option>Homepage Hero</option>
                <option>Sidebar Kanan</option>
                <option>Pop-up</option>
                <option>Ticker Bar</option>
                <option>Bawah Game Grid</option>
                <option>Halaman Topup</option>
              </select>
            </div>
            <div className="fld">
              <label className="flbl">Tipe</label>
              <select className="finp" value={aForm.type} onChange={e=>setAForm(f=>({...f,type:e.target.value}))}>
                <option value="image">Gambar</option>
                <option value="text">Teks</option>
                <option value="popup">Pop-up</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="fld">
              <label className="flbl">Tanggal Mulai</label>
              <input className="finp" type="date" value={aForm.start}
                onChange={e=>setAForm(f=>({...f,start:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Tanggal Berakhir</label>
              <input className="finp" type="date" value={aForm.end}
                onChange={e=>setAForm(f=>({...f,end:e.target.value}))} />
            </div>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">URL Gambar / Konten</label>
              <input className="finp" placeholder="https://..." />
            </div>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">Link Tujuan (opsional)</label>
              <input className="finp" placeholder="https://jackspw.id/topup/..." />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn-p" onClick={() => {
              if (!aForm.name) return;
              setAds(a => [...a, { id:Date.now(), name:aForm.name, placement:aForm.placement,
                type:aForm.type, status:"active", clicks:0, views:0,
                start:aForm.start, end:aForm.end }]);
              setModal(null); showFlash("Iklan berhasil ditambahkan");
              setAForm({ name:"",placement:"Homepage Hero",type:"image",start:"",end:"" });
            }}>Simpan Iklan</button>
            <button className="btn-o" onClick={() => setModal(null)}>Batal</button>
          </div>
        </Modal>
      )}

      {modal === "add-banner" && (
        <Modal title="Tambah Banner Slider" onClose={() => setModal(null)}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">Judul Banner</label>
              <input className="finp" placeholder="MLBB × EVENT BARU" value={bForm.title}
                onChange={e=>setBForm(f=>({...f,title:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Tag Label</label>
              <input className="finp" placeholder="Flash Sale" value={bForm.tag}
                onChange={e=>setBForm(f=>({...f,tag:e.target.value}))} />
            </div>
            <div className="fld">
              <label className="flbl">Warna Background</label>
              <input type="color" className="finp" value={bForm.bg}
                onChange={e=>setBForm(f=>({...f,bg:e.target.value}))}
                style={{ height:40, cursor:"pointer" }} />
            </div>
            <div className="fld">
              <label className="flbl">Warna Aksen</label>
              <input type="color" className="finp" value={bForm.accent}
                onChange={e=>setBForm(f=>({...f,accent:e.target.value}))}
                style={{ height:40, cursor:"pointer" }} />
            </div>
            <div className="fld" style={{ gridColumn:"1/-1" }}>
              <label className="flbl">Subtitle</label>
              <input className="finp" placeholder="Deskripsi singkat banner..." />
            </div>
            {/* Preview */}
            <div style={{ gridColumn:"1/-1", borderRadius:6, height:80, background:bForm.bg,
              display:"flex", alignItems:"center", padding:"0 20px", position:"relative", overflow:"hidden" }}>
              <div>
                <div style={{ fontFamily:"var(--fd)", fontSize:20, color:bForm.accent, fontWeight:800, letterSpacing:2 }}>
                  {bForm.title || "PREVIEW BANNER"}
                </div>
                <div style={{ fontFamily:"var(--fc)", fontSize:9, letterSpacing:2, color:bForm.accent+"88", textTransform:"uppercase", marginTop:2 }}>
                  {bForm.tag || "Tag"}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-row">
            <button className="btn-p" onClick={() => {
              if (!bForm.title) return;
              setBanners(b => [...b, { id:Date.now(), title:bForm.title, tag:bForm.tag,
                bg:bForm.bg, accent:bForm.accent, active:true, order:banners.length+1 }]);
              setModal(null); showFlash("Banner berhasil ditambahkan");
              setBForm({ title:"",tag:"",bg:"#050d1a",accent:"#4a9eff" });
            }}>Simpan Banner</button>
            <button className="btn-o" onClick={() => setModal(null)}>Batal</button>
          </div>
        </Modal>
      )}

      <div className="shell">
        {/* SIDEBAR */}
        <aside className={`sb ${col?"col":""}`}>
          <div className="sb-top">
            <div className="sb-ico">J</div>
            {!col && <div><div className="sb-name">JACKSPW</div><div className="sb-tag">Admin Panel</div></div>}
          </div>
          <nav className="sb-nav">
            {NAV_GROUPS.map((g,gi) => (
              <div key={gi}>
                {gi > 0 && <div className="sb-sep"/>}
                {!col && <div className="sb-group">{g.group}</div>}
                {g.items.map(n => (
                  <button key={n.id} className={`sb-link ${page===n.id?"act":""}`} onClick={() => setPage(n.id)}>
                    <span className="sb-link-i">{n.icon}</span>
                    {!col && <span className="sb-link-l">{n.label}</span>}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="sb-bot">
            <button className="sb-tog" onClick={() => setCol(c=>!c)}>
              {col ? "▸" : "◂"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <div className="tbar">
            <div className="tbar-title">{TITLES[page]}</div>
            <div className="tbar-r">
              <span className="tbar-badge">{settings.maintenanceMode ? "⚠ MAINTENANCE" : "● LIVE"}</span>
              <div className="tbar-av">A</div>
            </div>
          </div>

          <div className="cnt">

            {/* ── OVERVIEW ── */}
            {page === "overview" && (<>
              <div className="stat-g">
                {[
                  { l:"Revenue Hari Ini", v:rp(totalRev),             s:`${successCnt} sukses`,      c:"var(--accent)", i:"◎" },
                  { l:"Total Transaksi",  v:DUMMY_TX.length,           s:"Hari ini",                  c:"var(--info)",   i:"↔" },
                  { l:"Transaksi Gagal",  v:failedCnt,                 s:"Perlu ditangani",            c:"var(--err)",    i:"✕" },
                  { l:"Saldo Digiflazz", v:rp(settings.digiBalance),  s:"Segera deposit",             c:"var(--warn)",   i:"◈" },
                ].map((s,i) => (
                  <div className="sc" key={i} style={{"--sc":s.c}}>
                    <div className="sc-l">{s.l}</div>
                    <div className="sc-v">{s.v}</div>
                    <div className="sc-s">{s.s}</div>
                    <div className="sc-i">{s.i}</div>
                  </div>
                ))}
              </div>
              <div className="chart">
                <div className="chart-h">
                  <span className="chart-ht">Revenue 7 Hari</span>
                  <span className="tag-ok">↑ +12% vs minggu lalu</span>
                </div>
                <div className="bars">
                  {REVENUE_CHART.map((d,i) => (
                    <div className="bar-w" key={i}>
                      <div className="bar-t"><div className="bar-f" style={{ height:`${(d.rev/maxRev)*100}%` }}/></div>
                      <div className="bar-d">{d.day}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="two">
                <div className="panel">
                  <div className="ph"><span className="pt">Transaksi Terbaru</span><button className="btn-o" onClick={()=>setPage("transactions")}>Lihat Semua</button></div>
                  <table className="t"><tbody>
                    {DUMMY_TX.slice(0,5).map(t => (
                      <tr key={t.id}>
                        <td><span className="tid">{t.id}</span></td>
                        <td><span className="tg">{t.game}</span></td>
                        <td><StatusBadge status={t.status}/></td>
                        <td><span className="ta">{rp(t.amount)}</span></td>
                      </tr>
                    ))}
                  </tbody></table>
                </div>
                <div className="panel">
                  <div className="ph"><span className="pt">Produk Terlaris</span></div>
                  <div>
                    {[...DUMMY_PRODUCTS].sort((a,b)=>b.sold-a.sold).slice(0,5).map((p,i) => (
                      <div className="ir" key={p.sku}>
                        <span style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t3)",width:16 }}>{i+1}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:12,fontWeight:500,color:"var(--text)" }}>{p.name}</div>
                          <div style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)" }}>{p.game}</div>
                        </div>
                        <span style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t2)" }}>{p.sold}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>)}

            {/* ── TRANSAKSI ── */}
            {page === "transactions" && (<>
              <div className="fb">
                <input className="fi" placeholder="Cari ID, game, nomor HP..." value={txSearch} onChange={e=>setTxSearch(e.target.value)}/>
                {["all","success","pending","processing","failed"].map(s => (
                  <button key={s} className={`fbtn ${txFilter===s?"on":""}`} onClick={()=>setTxFilter(s)}>
                    {s==="all"?"Semua":s.charAt(0).toUpperCase()+s.slice(1)}
                  </button>
                ))}
              </div>
              <div className="panel" style={{ overflowX:"auto" }}>
                <table className="t">
                  <thead><tr>
                    <th>ID</th><th>Game</th><th>Produk</th><th>User</th>
                    <th>Metode</th><th>Amount</th><th>Status</th><th>Tanggal</th><th>Aksi</th>
                  </tr></thead>
                  <tbody>
                    {txFiltered.map(t => (
                      <tr key={t.id}>
                        <td><span className="tid">{t.id}</span></td>
                        <td><span className="tg">{t.game}</span></td>
                        <td style={{ fontSize:11 }}>{t.product}</td>
                        <td style={{ fontFamily:"var(--fc)",fontSize:10 }}>{t.user}</td>
                        <td style={{ fontSize:11 }}>{t.method}</td>
                        <td><span className="ta">{rp(t.amount)}</span></td>
                        <td><StatusBadge status={t.status}/></td>
                        <td style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)",whiteSpace:"nowrap" }}>{t.date}</td>
                        <td><div style={{ display:"flex",gap:5 }}>
                          <button className="btn-o" style={{ padding:"4px 8px",fontSize:9 }}>Detail</button>
                          {t.status==="failed" && <button className="btn-o" style={{ padding:"4px 8px",fontSize:9,borderColor:"#3a2a10",color:"var(--warn)" }}>Retry</button>}
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!txFiltered.length && <div style={{ padding:32,textAlign:"center",color:"var(--t3)",fontSize:12 }}>Tidak ada transaksi.</div>}
              </div>
            </>)}

            {/* ── PRODUK ── */}
            {page === "products" && (<>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                <span style={{ fontFamily:"var(--fd)",fontSize:15,fontWeight:700,color:"var(--text)" }}>Daftar Produk</span>
                <button className="btn-p" style={{ padding:"8px 16px",fontSize:10 }}
                  onClick={() => showFlash("Sync Digiflazz berhasil — 48 produk diperbarui")}>
                  ↻ Sync Digiflazz
                </button>
              </div>
              <div className="panel">
                <div className="ph">
                  <span className="pt">Semua Produk ({products.length})</span>
                  <span className="ps">HPP · Harga Jual · Terjual</span>
                </div>
                {products.map(p => (
                  <div key={p.sku}>
                    <div className="ir">
                      <Toggle checked={p.active} onChange={() => setProducts(ps=>ps.map(x=>x.sku===p.sku?{...x,active:!x.active}:x))}/>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12,fontWeight:500,color:"var(--text)" }}>{p.name}</div>
                        <div style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)" }}>{p.game}</div>
                      </div>
                      <span style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t3)",width:80,textAlign:"right" }}>{rp(p.hpp)}</span>
                      <span style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--accent)",width:80,textAlign:"right" }}>{rp(p.sell)}</span>
                      <span style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t3)",width:44,textAlign:"right" }}>{p.sold}x</span>
                      <button className="btn-o" style={{ padding:"4px 10px",fontSize:9 }}
                        onClick={() => setProdEdit(p.sku===prodEdit?null:p.sku)}>Edit</button>
                    </div>
                    {prodEdit===p.sku && (
                      <div style={{ padding:"12px 16px",background:"var(--bg3)",borderBottom:"1px solid var(--border)" }}>
                        <div style={{ display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap" }}>
                          <div className="fld" style={{ flex:1,minWidth:120 }}>
                            <label className="flbl">HPP (read-only)</label>
                            <input className="finp" readOnly value={rp(p.hpp)} style={{ opacity:.5 }}/>
                          </div>
                          <div className="fld" style={{ flex:1,minWidth:120 }}>
                            <label className="flbl">Harga Jual</label>
                            <input className="finp" defaultValue={p.sell} onChange={e=>{
                              const v=parseInt(e.target.value.replace(/\D/g,""));
                              if(!isNaN(v)) setProducts(ps=>ps.map(x=>x.sku===p.sku?{...x,sell:v}:x));
                            }}/>
                          </div>
                          <button className="btn-p" style={{ padding:"9px 16px",fontSize:10 }}
                            onClick={()=>{setProdEdit(null);showFlash("Harga berhasil diperbarui");}}>Simpan</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>)}

            {/* ── BANNER ── */}
            {page === "banners" && (<>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                <span style={{ fontFamily:"var(--fd)",fontSize:15,fontWeight:700,color:"var(--text)" }}>Banner Slider</span>
                <button className="btn-p" style={{ padding:"8px 16px",fontSize:10 }} onClick={()=>setModal("add-banner")}>+ Tambah Banner</button>
              </div>
              <div className="panel">
                <div className="ph"><span className="pt">Semua Banner</span><span className="ps">Urutan · Aktif / Nonaktif</span></div>
                {banners.map(b => (
                  <div className="ir" key={b.id}>
                    <span style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t3)",width:18,textAlign:"center" }}>{b.order}</span>
                    <div style={{ width:48,height:28,borderRadius:4,background:b.bg,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <span style={{ fontFamily:"var(--fd)",fontSize:7,color:b.accent,letterSpacing:1 }}>◉</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12,fontWeight:500,color:"var(--text)" }}>{b.title}</div>
                      <div style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)",marginTop:1 }}>{b.tag}</div>
                    </div>
                    <Toggle checked={b.active} onChange={()=>setBanners(bs=>bs.map(x=>x.id===b.id?{...x,active:!x.active}:x))}/>
                    <button className="btn-o" style={{ padding:"4px 10px",fontSize:9 }}>Edit</button>
                    <button className="btn-d" style={{ padding:"4px 10px",fontSize:9 }}
                      onClick={()=>{setBanners(bs=>bs.filter(x=>x.id!==b.id));showFlash("Banner dihapus");}}>Hapus</button>
                  </div>
                ))}
                {!banners.length && <div style={{ padding:28,textAlign:"center",color:"var(--t3)",fontSize:12 }}>Belum ada banner.</div>}
              </div>
            </>)}

            {/* ── ADS / IKLAN ── */}
            {page === "ads" && (<>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                <span style={{ fontFamily:"var(--fd)",fontSize:15,fontWeight:700,color:"var(--text)" }}>Manajemen Iklan</span>
                <button className="btn-p" style={{ padding:"8px 16px",fontSize:10 }} onClick={()=>setModal("add-ad")}>+ Tambah Iklan</button>
              </div>
              <div className="stat-g" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
                {[
                  { l:"Total Tayangan",  v: ads.reduce((a,b)=>a+b.views,0).toLocaleString(), c:"var(--info)" },
                  { l:"Total Klik",      v: ads.reduce((a,b)=>a+b.clicks,0).toLocaleString(), c:"var(--accent)" },
                  { l:"Iklan Aktif",     v: ads.filter(a=>a.status==="active").length, c:"var(--success)" },
                ].map((s,i) => (
                  <div className="sc" key={i} style={{"--sc":s.c}}>
                    <div className="sc-l">{s.l}</div>
                    <div className="sc-v">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="panel" style={{ overflowX:"auto" }}>
                <div className="ph"><span className="pt">Semua Iklan</span></div>
                <table className="t">
                  <thead><tr>
                    <th>Nama Iklan</th><th>Penempatan</th><th>Tipe</th>
                    <th>Tayangan</th><th>Klik</th><th>CTR</th>
                    <th>Periode</th><th>Status</th><th>Aksi</th>
                  </tr></thead>
                  <tbody>
                    {ads.map(a => (
                      <tr key={a.id}>
                        <td><span className="tg">{a.name}</span></td>
                        <td style={{ fontSize:11 }}>{a.placement}</td>
                        <td><span style={{ fontFamily:"var(--fc)",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:"var(--t2)" }}>{a.type}</span></td>
                        <td><span className="ta">{a.views.toLocaleString()}</span></td>
                        <td><span className="ta">{a.clicks.toLocaleString()}</span></td>
                        <td><span style={{ fontFamily:"var(--fc)",fontSize:10,color:a.views>0?"var(--accent)":"var(--t3)" }}>
                          {a.views>0 ? ((a.clicks/a.views)*100).toFixed(2)+"%" : "—"}
                        </span></td>
                        <td style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)",whiteSpace:"nowrap" }}>{a.start} → {a.end}</td>
                        <td><StatusBadge status={a.status}/></td>
                        <td><div style={{ display:"flex",gap:5 }}>
                          <button className="btn-o" style={{ padding:"4px 9px",fontSize:9 }}
                            onClick={()=>setAds(as=>as.map(x=>x.id===a.id?{...x,status:x.status==="active"?"paused":"active"}:x))}>
                            {a.status==="active"?"Pause":"Aktifkan"}
                          </button>
                          <button className="btn-d" style={{ padding:"4px 9px",fontSize:9 }}
                            onClick={()=>{setAds(as=>as.filter(x=>x.id!==a.id));showFlash("Iklan dihapus");}}>Hapus</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>)}

            {/* ── VOUCHER ── */}
            {page === "vouchers" && (<>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontFamily:"var(--fd)",fontSize:15,fontWeight:700,color:"var(--text)" }}>Voucher</span>
                <button className="btn-p" style={{ padding:"8px 16px",fontSize:10 }} onClick={()=>setModal("add-voucher")}>+ Tambah Voucher</button>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10 }}>
                {vouchers.map(v => (
                  <div className="vcard" key={v.id} style={{ "--vc": v.active ? "var(--accent)" : "var(--t3)" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div className="vcode">{v.code}</div>
                      <div className="vbadge" style={{ position:"static" }}>
                        <StatusBadge status={v.active?"active":"inactive"}/>
                      </div>
                    </div>
                    <div className="vinfo">
                      {v.type==="percent" ? `Diskon ${v.value}%` : `Diskon ${rp(v.value)}`}
                      {` · Min. ${rp(v.minTx)} · Maks. ${rp(v.maxDisc)}`}
                    </div>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10 }}>
                      <div>
                        <div style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t3)" }}>
                          Digunakan: <span style={{ color:"var(--text)" }}>{v.used}/{v.quota}</span>
                        </div>
                        <div style={{ width:`${Math.min((v.used/v.quota)*100,100)}%`,height:2,background:"var(--accent)",borderRadius:2,marginTop:4,minWidth:2,maxWidth:"100%" }}/>
                      </div>
                      <div style={{ display:"flex",gap:6 }}>
                        <Toggle checked={v.active} onChange={()=>setVouchers(vs=>vs.map(x=>x.id===v.id?{...x,active:!x.active}:x))}/>
                        <button className="btn-d" style={{ padding:"4px 8px",fontSize:9 }}
                          onClick={()=>{setVouchers(vs=>vs.filter(x=>x.id!==v.id));showFlash("Voucher dihapus");}}>✕</button>
                      </div>
                    </div>
                    <div style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)",marginTop:6 }}>Exp: {v.exp}</div>
                  </div>
                ))}
              </div>
            </>)}

            {/* ── PROMO ── */}
            {page === "promos" && (<>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontFamily:"var(--fd)",fontSize:15,fontWeight:700,color:"var(--text)" }}>Promo & Diskon</span>
                <button className="btn-p" style={{ padding:"8px 16px",fontSize:10 }} onClick={()=>setModal("add-promo")}>+ Tambah Promo</button>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10 }}>
                {promos.map(p => (
                  <div className="pcard" key={p.id} style={{ opacity: p.active?1:0.5 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4 }}>
                      <div>
                        <div className="pname">{p.name}</div>
                        <div className="pgame">{p.game}</div>
                      </div>
                      <StatusBadge status={p.active?"active":"inactive"}/>
                    </div>
                    <div style={{ display:"flex",alignItems:"baseline",gap:6,marginBottom:8 }}>
                      <div className="pdis">
                        {p.type==="flat" ? rp(p.discount)
                          : p.type==="bonus" ? "BONUS"
                          : p.type==="cashback" ? `${p.discount}% CB`
                          : `${p.discount}% OFF`}
                      </div>
                      <span style={{ fontFamily:"var(--fc)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"var(--t3)" }}>{p.type}</span>
                    </div>
                    <div style={{ fontFamily:"var(--fc)",fontSize:9,color:"var(--t3)",marginBottom:10 }}>
                      {p.start} → {p.end} · {p.used}x digunakan
                    </div>
                    <div style={{ display:"flex",gap:7 }}>
                      <Toggle checked={p.active} onChange={()=>setPromos(ps=>ps.map(x=>x.id===p.id?{...x,active:!x.active}:x))}/>
                      <button className="btn-o" style={{ padding:"4px 10px",fontSize:9 }}>Edit</button>
                      <button className="btn-d" style={{ padding:"4px 10px",fontSize:9 }}
                        onClick={()=>{setPromos(ps=>ps.filter(x=>x.id!==p.id));showFlash("Promo dihapus");}}>Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </>)}

            {/* ── SALDO ── */}
            {page === "saldo" && (<>
              <div className="sal-card">
                <div className="sal-l">Saldo Digiflazz</div>
                <div className="sal-v">{rp(settings.digiBalance)}</div>
                <div className="sal-s">Diperbarui: 25 Mei 2025, 14:30</div>
                {settings.digiBalance < 3000000 && (
                  <div className="sal-w">⚠ Saldo mendekati batas minimum. Segera lakukan deposit.</div>
                )}
              </div>
              <div className="two">
                <div className="panel">
                  <div className="ph"><span className="pt">Catat Deposit</span></div>
                  <div style={{ padding:16,display:"flex",flexDirection:"column",gap:12 }}>
                    <div className="fld"><label className="flbl">Nominal</label><input className="finp" placeholder="Contoh: 500000"/></div>
                    <div className="fld"><label className="flbl">Catatan</label><input className="finp" placeholder="Transfer BCA - 25 Mei 2025"/></div>
                    <button className="btn-p" style={{ width:"100%" }} onClick={()=>showFlash("Deposit berhasil dicatat")}>Catat Deposit</button>
                  </div>
                </div>
                <div className="panel">
                  <div className="ph"><span className="pt">Riwayat Deposit</span></div>
                  <table className="t">
                    <thead><tr><th>Tanggal</th><th>Nominal</th><th>Status</th></tr></thead>
                    <tbody>
                      {[{ d:"24 Mei",a:1000000 },{ d:"20 Mei",a:2000000 },{ d:"15 Mei",a:500000 }].map((x,i)=>(
                        <tr key={i}><td style={{ fontFamily:"var(--fc)",fontSize:10,color:"var(--t3)" }}>{x.d}</td>
                          <td><span className="ta">{rp(x.a)}</span></td>
                          <td><StatusBadge status="success"/></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>)}

            {/* ── SETTINGS ── */}
            {page === "settings" && (<>
              {[
                { icon:"◎", title:"Pengaturan Umum", fields:[
                  { k:"siteName",  l:"Nama Website" },
                  { k:"siteUrl",   l:"URL Website" },
                  { k:"notifEmail",l:"Email Notifikasi" },
                  { k:"marginDefault",l:"Margin Default (%)" },
                ]},
              ].map(sec => (
                <div className="s-sec" key={sec.title}>
                  <div className="s-h"><span className="s-hi">{sec.icon}</span><span className="s-ht">{sec.title}</span></div>
                  <div className="s-b">
                    <div className="fg">
                      {sec.fields.map(f => (
                        <div className="fld" key={f.k}>
                          <label className="flbl">{f.l}</label>
                          <input className="finp" value={settings[f.k]} onChange={e=>setSettings(s=>({...s,[f.k]:e.target.value}))}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="s-sec">
                <div className="s-h"><span className="s-hi">◈</span><span className="s-ht">API Digiflazz</span></div>
                <div className="s-b">
                  <div className="fg">
                    <div className="fld">
                      <label className="flbl">Username</label>
                      <input className="finp" value={settings.digiUsername} onChange={e=>setSettings(s=>({...s,digiUsername:e.target.value}))}/>
                    </div>
                    <div className="fld">
                      <label className="flbl">API Key</label>
                      <div className="frow">
                        <input className="finp" type={showKey.digi?"text":"password"} value={settings.digiKey} onChange={e=>setSettings(s=>({...s,digiKey:e.target.value}))}/>
                        <button className="key-btn" onClick={()=>setShowKey(k=>({...k,digi:!k.digi}))}>{showKey.digi?"Sembunyikan":"Tampilkan"}</button>
                      </div>
                    </div>
                  </div>
                  <button className="btn-o" style={{ padding:"7px 14px",fontSize:9 }} onClick={()=>showFlash("Koneksi Digiflazz OK ✓")}>Test Koneksi</button>
                </div>
              </div>
              <div className="s-sec">
                <div className="s-h"><span className="s-hi">▣</span><span className="s-ht">API Tripay</span></div>
                <div className="s-b">
                  <div className="fg">
                    <div className="fld">
                      <label className="flbl">Merchant Code</label>
                      <input className="finp" value={settings.tripayMerchant} onChange={e=>setSettings(s=>({...s,tripayMerchant:e.target.value}))}/>
                    </div>
                    <div className="fld">
                      <label className="flbl">API Key</label>
                      <div className="frow">
                        <input className="finp" type={showKey.tripay?"text":"password"} value={settings.tripayKey} onChange={e=>setSettings(s=>({...s,tripayKey:e.target.value}))}/>
                        <button className="key-btn" onClick={()=>setShowKey(k=>({...k,tripay:!k.tripay}))}>{showKey.tripay?"Sembunyikan":"Tampilkan"}</button>
                      </div>
                    </div>
                    <div className="fld" style={{ gridColumn:"1/-1" }}>
                      <label className="flbl">Private Key</label>
                      <div className="frow">
                        <input className="finp" type={showKey.priv?"text":"password"} value={settings.tripayPrivate} onChange={e=>setSettings(s=>({...s,tripayPrivate:e.target.value}))}/>
                        <button className="key-btn" onClick={()=>setShowKey(k=>({...k,priv:!k.priv}))}>{showKey.priv?"Sembunyikan":"Tampilkan"}</button>
                      </div>
                    </div>
                  </div>
                  <button className="btn-o" style={{ padding:"7px 14px",fontSize:9 }} onClick={()=>showFlash("Koneksi Tripay OK ✓")}>Test Koneksi</button>
                </div>
              </div>
              <div className="s-sec">
                <div className="s-h"><span className="s-hi">⚙</span><span className="s-ht">Sistem</span></div>
                <div className="s-b">
                  {[
                    { k:"maintenanceMode",l:"Maintenance Mode",s:"Matikan akses publik sementara" },
                    { k:"autoRefund",     l:"Auto Refund",     s:"Refund otomatis jika transaksi gagal" },
                  ].map(item => (
                    <div className="tog-r" key={item.k}>
                      <div><div className="tog-l">{item.l}</div><div className="tog-s">{item.s}</div></div>
                      <Toggle checked={settings[item.k]} onChange={()=>setSettings(s=>({...s,[item.k]:!s[item.k]}))}/>
                    </div>
                  ))}
                  <div className="btn-row" style={{ marginTop:4 }}>
                    <button className="btn-p" onClick={()=>showFlash("Pengaturan berhasil disimpan")}>Simpan Semua</button>
                    <button className="btn-d">Reset Default</button>
                  </div>
                </div>
              </div>
            </>)}

          </div>
        </div>
      </div>
    </>
  );
}
