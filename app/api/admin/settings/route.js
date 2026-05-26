// app/api/admin/settings/route.js
// GET  /api/admin/settings       → ambil semua setting
// POST /api/admin/settings       → update setting (key-value)
// POST /api/admin/settings/test  → test koneksi API (Digiflazz/Tripay)

import { requireAdmin, ok, err } from "@/lib/adminAuth";

// Kunci setting yang diizinkan (whitelist)
const ALLOWED_KEYS = [
  "site_name", "site_url", "notif_email",
  "margin_default", "maintenance_mode",
  "auto_refund", "min_saldo_alert",
  "digiflazz_username", "digiflazz_key",
  "tripay_merchant", "tripay_key", "tripay_private",
  "wa_number", "cs_link",
];

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  // const settings = await prisma.setting.findMany();
  // const map = Object.fromEntries(settings.map(s => [s.key, s.value]));

  // Dummy — key sensitif dimasker
  const map = {
    site_name:          "JacksPW",
    site_url:           "https://jackspw.id",
    notif_email:        "admin@jackspw.id",
    margin_default:     "5",
    maintenance_mode:   "false",
    auto_refund:        "true",
    min_saldo_alert:    "500000",
    digiflazz_username: "jackspw_user",
    digiflazz_key:      "••••••••••••••••",
    tripay_merchant:    "T12345",
    tripay_key:         "••••••••••••••••",
    tripay_private:     "••••••••••••••••",
    wa_number:          "6281234567890",
    cs_link:            "https://wa.me/6281234567890",
  };

  return ok(map);
}

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();

  // body bisa { key, value } untuk satu setting
  // atau { settings: { key1: val1, key2: val2 } } untuk bulk update
  const updates = body.settings || { [body.key]: body.value };

  const blocked = Object.keys(updates).filter(k => !ALLOWED_KEYS.includes(k));
  if (blocked.length) return err(`Key tidak diizinkan: ${blocked.join(", ")}`);

  // for (const [key, value] of Object.entries(updates)) {
  //   await prisma.setting.upsert({
  //     where: { key },
  //     update: { value: String(value) },
  //     create: { key, value: String(value) },
  //   });
  // }

  // Handle special case: maintenance_mode
  if ("maintenance_mode" in updates) {
    // Bisa trigger kirim notif email ke admin
    console.log("Maintenance mode:", updates.maintenance_mode);
  }

  return ok({ updated: Object.keys(updates), updatedAt: new Date().toISOString() });
}
