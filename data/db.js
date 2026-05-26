// ============================================================
// JACKSPW — Dummy Database
// In production: replace with Prisma + PostgreSQL/MySQL
// ============================================================

export const CATEGORIES = [
  { id: "games", label: "Games", icon: "🎮" },
  { id: "pulsa", label: "Pulsa & Data", icon: "📱" },
  { id: "pln", label: "PLN & TV", icon: "⚡" },
  { id: "ewallet", label: "E-Wallet", icon: "💳" },
  { id: "voucher", label: "Voucher", icon: "🎫" },
];

export const GAMES = [
  {
    id: "mlbb",
    name: "Mobile Legends",
    publisher: "Moonton",
    category: "games",
    genre: "MOBA",
    img: "https://placehold.co/300x300/0d1117/c9a84c?text=ML",
    banner: "https://placehold.co/800x300/0d1117/c9a84c?text=Mobile+Legends",
    trending: true,
    hot: true,
    inputFields: [
      { key: "user_id", label: "User ID", placeholder: "Contoh: 123456789" },
      { key: "zone_id", label: "Zone ID", placeholder: "Contoh: 1234" },
    ],
    products: [
      { sku: "ml-86",   name: "86 Diamonds",   price: 19000,  hpp: 17000, bonus: "" },
      { sku: "ml-172",  name: "172 Diamonds",  price: 37000,  hpp: 33000, bonus: "" },
      { sku: "ml-257",  name: "257 Diamonds",  price: 55000,  hpp: 50000, bonus: "" },
      { sku: "ml-344",  name: "344 Diamonds",  price: 72000,  hpp: 65000, bonus: "" },
      { sku: "ml-514",  name: "514 Diamonds",  price: 107000, hpp: 97000, bonus: "🔥" },
      { sku: "ml-706",  name: "706 Diamonds",  price: 145000, hpp: 132000, bonus: "" },
      { sku: "ml-1060", name: "1060 Diamonds", price: 215000, hpp: 196000, bonus: "⭐" },
      { sku: "ml-2195", name: "2195 Diamonds", price: 435000, hpp: 396000, bonus: "👑" },
      { sku: "ml-wkly", name: "Weekly Diamond Pass", price: 27000, hpp: 24000, bonus: "" },
      { sku: "ml-twkly",name: "Twilight Pass",       price: 145000, hpp: 132000, bonus: "" },
    ],
  },
  {
    id: "mlbb-global",
    name: "Mobile Legends Global",
    publisher: "Moonton",
    category: "games",
    genre: "MOBA",
    img: "https://placehold.co/300x300/0d1117/8ab4f8?text=ML+GL",
    banner: "https://placehold.co/800x300/0d1117/8ab4f8?text=ML+Global",
    trending: false,
    hot: false,
    inputFields: [
      { key: "user_id", label: "User ID", placeholder: "Contoh: 123456789" },
      { key: "zone_id", label: "Zone ID", placeholder: "Contoh: 1234" },
    ],
    products: [
      { sku: "mlgl-100", name: "100 Diamonds", price: 22000, hpp: 20000, bonus: "" },
      { sku: "mlgl-200", name: "200 Diamonds", price: 43000, hpp: 39000, bonus: "" },
      { sku: "mlgl-500", name: "500 Diamonds", price: 107000, hpp: 97000, bonus: "🔥" },
    ],
  },
  {
    id: "ff",
    name: "Free Fire",
    publisher: "Garena",
    category: "games",
    genre: "Battle Royale",
    img: "https://placehold.co/300x300/0d1117/ff6b35?text=FF",
    banner: "https://placehold.co/800x300/0d1117/ff6b35?text=Free+Fire",
    trending: true,
    hot: true,
    inputFields: [
      { key: "player_id", label: "Player ID", placeholder: "Contoh: 1234567890" },
    ],
    products: [
      { sku: "ff-70",   name: "70 Diamonds",   price: 15000, hpp: 13500, bonus: "" },
      { sku: "ff-140",  name: "140 Diamonds",  price: 29000, hpp: 26000, bonus: "" },
      { sku: "ff-355",  name: "355 Diamonds",  price: 72000, hpp: 65000, bonus: "🔥" },
      { sku: "ff-720",  name: "720 Diamonds",  price: 145000, hpp: 132000, bonus: "" },
      { sku: "ff-1450", name: "1450 Diamonds", price: 285000, hpp: 259000, bonus: "⭐" },
    ],
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    publisher: "Tencent Games",
    category: "games",
    genre: "Battle Royale",
    img: "https://placehold.co/300x300/0d1117/f5c518?text=PUBG",
    banner: "https://placehold.co/800x300/0d1117/f5c518?text=PUBG+Mobile",
    trending: true,
    hot: false,
    inputFields: [
      { key: "player_id", label: "Player ID", placeholder: "Contoh: 5123456789" },
    ],
    products: [
      { sku: "pubg-60",   name: "60 UC",   price: 14000, hpp: 12500, bonus: "" },
      { sku: "pubg-325",  name: "325 UC",  price: 69000, hpp: 62000, bonus: "" },
      { sku: "pubg-660",  name: "660 UC",  price: 137000, hpp: 124000, bonus: "🔥" },
      { sku: "pubg-1800", name: "1800 UC", price: 370000, hpp: 336000, bonus: "⭐" },
    ],
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    publisher: "HoYoverse",
    category: "games",
    genre: "RPG",
    img: "https://placehold.co/300x300/0d1117/a8d8ea?text=GI",
    banner: "https://placehold.co/800x300/0d1117/a8d8ea?text=Genshin+Impact",
    trending: false,
    hot: false,
    inputFields: [
      { key: "uid", label: "UID", placeholder: "Contoh: 812345678" },
      { key: "server", label: "Server", placeholder: "Asia / America / Europe", type: "select", options: ["Asia", "America", "Europe", "TW/HK/MO"] },
    ],
    products: [
      { sku: "gi-60",   name: "60 Genesis Crystals",   price: 14000, hpp: 12500, bonus: "" },
      { sku: "gi-300",  name: "300 Genesis Crystals",  price: 69000, hpp: 62000, bonus: "" },
      { sku: "gi-980",  name: "980 Genesis Crystals",  price: 215000, hpp: 196000, bonus: "🔥" },
      { sku: "gi-1980", name: "1980 Genesis Crystals", price: 430000, hpp: 390000, bonus: "⭐" },
      { sku: "gi-bp",   name: "Blessing of Welkin Moon", price: 72000, hpp: 65000, bonus: "" },
    ],
  },
  {
    id: "valorant",
    name: "Valorant",
    publisher: "Riot Games",
    category: "games",
    genre: "FPS",
    img: "https://placehold.co/300x300/0d1117/ff4655?text=VL",
    banner: "https://placehold.co/800x300/0d1117/ff4655?text=Valorant",
    trending: false,
    hot: false,
    inputFields: [
      { key: "riot_id", label: "Riot ID", placeholder: "Contoh: Player#1234" },
    ],
    products: [
      { sku: "vl-475",  name: "475 VP",  price: 50000, hpp: 45000, bonus: "" },
      { sku: "vl-1000", name: "1000 VP", price: 100000, hpp: 90000, bonus: "" },
      { sku: "vl-2050", name: "2050 VP", price: 200000, hpp: 182000, bonus: "🔥" },
      { sku: "vl-3650", name: "3650 VP", price: 350000, hpp: 318000, bonus: "⭐" },
    ],
  },
  {
    id: "hok",
    name: "Honor of Kings",
    publisher: "TiMi Studio",
    category: "games",
    genre: "MOBA",
    img: "https://placehold.co/300x300/0d1117/c9a84c?text=HoK",
    banner: "https://placehold.co/800x300/0d1117/c9a84c?text=Honor+of+Kings",
    trending: true,
    hot: false,
    inputFields: [
      { key: "player_id", label: "Player ID", placeholder: "Contoh: 123456789" },
    ],
    products: [
      { sku: "hok-100", name: "100 Tokens", price: 18000, hpp: 16000, bonus: "" },
      { sku: "hok-300", name: "300 Tokens", price: 52000, hpp: 47000, bonus: "" },
      { sku: "hok-660", name: "660 Tokens", price: 112000, hpp: 102000, bonus: "🔥" },
    ],
  },
  {
    id: "codm",
    name: "Call of Duty Mobile",
    publisher: "Garena",
    category: "games",
    genre: "FPS",
    img: "https://placehold.co/300x300/0d1117/4a9eff?text=CODM",
    banner: "https://placehold.co/800x300/0d1117/4a9eff?text=COD+Mobile",
    trending: false,
    hot: false,
    inputFields: [
      { key: "player_id", label: "Player ID", placeholder: "Contoh: 1234567890" },
    ],
    products: [
      { sku: "codm-80",  name: "80 CP",  price: 15000, hpp: 13500, bonus: "" },
      { sku: "codm-400", name: "400 CP", price: 72000, hpp: 65000, bonus: "🔥" },
      { sku: "codm-880", name: "880 CP", price: 145000, hpp: 132000, bonus: "" },
    ],
  },
];

export const PAYMENT_METHODS = [
  { id: "qris",    name: "QRIS",           group: "Scan",     fee: 0,    logo: "⬛" },
  { id: "dana",    name: "DANA",           group: "E-Wallet", fee: 0,    logo: "💙" },
  { id: "ovo",     name: "OVO",            group: "E-Wallet", fee: 0,    logo: "💜" },
  { id: "gopay",   name: "GoPay",          group: "E-Wallet", fee: 0,    logo: "💚" },
  { id: "shopeepay", name: "ShopeePay",   group: "E-Wallet", fee: 0,    logo: "🧡" },
  { id: "bca",     name: "BCA Virtual",    group: "Bank",     fee: 4000, logo: "🏦" },
  { id: "bni",     name: "BNI Virtual",    group: "Bank",     fee: 4000, logo: "🏦" },
  { id: "mandiri", name: "Mandiri Virtual",group: "Bank",     fee: 4000, logo: "🏦" },
  { id: "indomaret",name: "Indomaret",     group: "Retail",   fee: 2500, logo: "🏪" },
  { id: "alfamart", name: "Alfamart",      group: "Retail",   fee: 2500, logo: "🏪" },
];

// Dummy transactions (would come from DB)
export const DUMMY_TRANSACTIONS = [
  { id: "TRX-001", game: "Mobile Legends", product: "172 Diamonds", amount: 37000, status: "success", date: "2025-05-20 14:32" },
  { id: "TRX-002", game: "Free Fire",       product: "355 Diamonds", amount: 72000, status: "success", date: "2025-05-19 09:11" },
  { id: "TRX-003", game: "PUBG Mobile",     product: "660 UC",       amount: 137000, status: "pending", date: "2025-05-18 21:05" },
];
