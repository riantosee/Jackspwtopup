# JACKSPW — Top Up Game Platform

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS Modules + next/font (Bebas Neue, Barlow, Barlow Condensed)
- **Database**: PostgreSQL + Prisma *(belum diintegrasikan)*
- **Payment**: Tripay *(belum diintegrasikan)*
- **Provider**: Digiflazz *(belum diintegrasikan)*

## Struktur Folder
```
jackspw/
├── app/
│   ├── layout.jsx          ← Root layout + Google Fonts via next/font
│   ├── globals.css         ← Global CSS variables
│   ├── page.jsx            ← Home (Slider + Game Grid)
│   ├── topup/[slug]/       ← Halaman topup per game
│   ├── status/             ← Halaman status transaksi
│   └── cek/                ← Cek transaksi
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx      ← Sticky navbar + mobile menu
│   │   └── Footer.jsx
│   ├── home/
│   │   ├── BannerSlider.jsx  ← Auto-sliding banner iklan
│   │   └── GameGrid.jsx      ← Grid game dengan search & filter
│   └── topup/
│       └── TopupForm.jsx     ← Form 4-step + sticky order bar
├── data/
│   └── games.js            ← Dummy database (ganti dengan Prisma nanti)
└── .env.example
```

## Cara Jalankan

```bash
# 1. Install dependencies
npm install

# 2. Setup env
cp .env.example .env.local

# 3. Jalankan dev server
npm run dev
```

Buka http://localhost:3000

## Langkah Selanjutnya
1. Setup PostgreSQL + `npx prisma init`
2. Integrasi Digiflazz di `app/api/products/sync/route.js`
3. Integrasi Tripay di `app/api/transaction/route.js`
4. Deploy ke VPS dengan Cloudflare proxy
