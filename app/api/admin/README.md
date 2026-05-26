# JACKSPW — Admin API Reference

Base URL: `/api/admin/*`
Auth: Header `x-admin-token: <ADMIN_SECRET>` (dari .env)

---

## Endpoints

### Stats & Analytics
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/stats?range=7d` | Revenue, TX, top game, chart harian |

### Produk
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/products` | List semua produk |
| POST | `/api/admin/products` | Update harga/status |
| POST | `/api/admin/sync` | Sync produk dari Digiflazz |

### Transaksi
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/transactions?status=failed&q=081x` | List + filter |
| POST | `/api/admin/transactions` `{ action:"retry", txCode }` | Retry gagal |
| POST | `/api/admin/transactions` `{ action:"refund", txCode }` | Refund manual |

### Voucher
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/vouchers` | List voucher |
| POST | `/api/admin/vouchers` | Buat voucher baru |
| PUT | `/api/admin/vouchers` | Update voucher |
| DELETE | `/api/admin/vouchers?id=xxx` | Hapus voucher |

### Promo & Diskon
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/promos` | List promo |
| POST | `/api/admin/promos` | Buat promo baru |
| PUT | `/api/admin/promos` | Update / toggle aktif |
| DELETE | `/api/admin/promos?id=xxx` | Hapus promo |

### Banner Slider
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/banners` | List banner |
| POST | `/api/admin/banners` | Tambah banner |
| PUT | `/api/admin/banners` | Update banner |
| DELETE | `/api/admin/banners?id=xxx` | Hapus banner |

### Iklan
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/ads` | List iklan + CTR stats |
| POST | `/api/admin/ads` | Buat iklan baru |
| PUT | `/api/admin/ads` `{ action:"pause"|"activate" }` | Toggle status |
| DELETE | `/api/admin/ads?id=xxx` | Hapus iklan |

### Saldo & Deposit
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/saldo` | Saldo cached + riwayat |
| GET | `/api/admin/saldo?action=check` | Cek saldo real-time ke Digiflazz |
| POST | `/api/admin/saldo` | Catat deposit manual |

### Pengaturan
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/settings` | Semua setting |
| POST | `/api/admin/settings` | Update setting (single/bulk) |

### Test Koneksi
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/admin/test-connection` `{ provider:"digiflazz"|"tripay" }` | Test API + latency |

---

## Contoh Request

```bash
# Cek stats 7 hari
curl /api/admin/stats?range=7d -H "x-admin-token: your_secret"

# Retry transaksi gagal
curl -X POST /api/admin/transactions \
  -H "x-admin-token: your_secret" \
  -H "Content-Type: application/json" \
  -d '{"action":"retry","txCode":"TRX-ABC123"}'

# Buat voucher
curl -X POST /api/admin/vouchers \
  -H "x-admin-token: your_secret" \
  -H "Content-Type: application/json" \
  -d '{"code":"PROMO10","type":"percent","value":10,"minTx":50000,"maxDisc":15000,"quota":100,"exp":"2025-12-31"}'

# Test koneksi Digiflazz
curl -X POST /api/admin/test-connection \
  -H "x-admin-token: your_secret" \
  -H "Content-Type: application/json" \
  -d '{"provider":"digiflazz"}'
```
