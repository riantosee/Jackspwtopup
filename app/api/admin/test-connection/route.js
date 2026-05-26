// app/api/admin/test-connection/route.js
// POST /api/admin/test-connection → test koneksi Digiflazz atau Tripay
// body: { provider: "digiflazz" | "tripay" }

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { provider } = await req.json();

  if (!["digiflazz", "tripay"].includes(provider)) {
    return err("provider harus 'digiflazz' atau 'tripay'");
  }

  const start = Date.now();

  try {
    if (provider === "digiflazz") {
      const crypto   = (await import("crypto")).default;
      const USERNAME = process.env.DIGIFLAZZ_USERNAME;
      const API_KEY  = process.env.DIGIFLAZZ_API_KEY;

      if (!USERNAME || !API_KEY) return err("Digiflazz credentials belum diisi di .env");

      const sign = crypto.createHash("md5").update(USERNAME + API_KEY + "depo").digest("hex");

      const res  = await fetch("https://api.digiflazz.com/v1/cek-saldo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd: "deposit", username: USERNAME, sign }),
      });

      const data = await res.json();
      const ms   = Date.now() - start;

      if (!res.ok) return err(`Digiflazz error: ${data?.data?.message || "Unknown error"}`);

      return ok({
        provider:  "digiflazz",
        status:    "connected",
        balance:   data.data?.deposit,
        latencyMs: ms,
        checkedAt: new Date().toISOString(),
      });
    }

    if (provider === "tripay") {
      const API_KEY = process.env.TRIPAY_API_KEY;

      if (!API_KEY) return err("Tripay API key belum diisi di .env");

      const isDev = process.env.NODE_ENV !== "production";
      const base  = isDev
        ? "https://tripay.co.id/api-sandbox"
        : "https://tripay.co.id/api";

      const res  = await fetch(`${base}/merchant/payment-channel`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      const data = await res.json();
      const ms   = Date.now() - start;

      if (!data.success) return err(`Tripay error: ${data.message}`);

      return ok({
        provider:       "tripay",
        status:         "connected",
        channelCount:   data.data?.length || 0,
        environment:    isDev ? "sandbox" : "production",
        latencyMs:      ms,
        checkedAt:      new Date().toISOString(),
      });
    }

  } catch (e) {
    return err(`Koneksi gagal: ${e.message}`, 500);
  }
}
