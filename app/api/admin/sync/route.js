// app/api/admin/sync/route.js
// POST /api/admin/sync → sync semua produk dari Digiflazz ke DB

import { NextResponse } from "next/server";
import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json().catch(() => ({}));
  const marginPct = Number(body.margin) || 5; // default margin 5%

  try {
    // 1. Ambil price list dari Digiflazz
    const crypto = (await import("crypto")).default;
    const USERNAME = process.env.DIGIFLAZZ_USERNAME;
    const API_KEY  = process.env.DIGIFLAZZ_API_KEY;
    const sign     = crypto.createHash("md5").update(USERNAME + API_KEY + "pricelist").digest("hex");

    const res = await fetch("https://api.digiflazz.com/v1/price-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cmd: "prepaid", username: USERNAME, sign }),
    });

    const data = await res.json();
    const list = data.data || [];

    let synced = 0, skipped = 0;

    for (const item of list) {
      // Filter hanya produk game (sesuaikan kategori)
      if (!item.buyer_product_status) { skipped++; continue; }

      const hpp      = item.price;
      const priceSell = Math.ceil(hpp * (1 + marginPct / 100));

      // TODO: uncomment saat Prisma sudah disetup
      // await prisma.product.upsert({
      //   where: { sku: item.buyer_sku_code },
      //   update: { priceHpp: hpp, priceSell, isActive: item.seller_product_status && item.buyer_product_status },
      //   create: {
      //     sku:       item.buyer_sku_code,
      //     gameName:  item.product_name,
      //     gameSlug:  item.category.toLowerCase().replace(/\s+/g, "-"),
      //     name:      item.product_name,
      //     category:  item.category,
      //     priceHpp:  hpp,
      //     priceSell,
      //     isActive:  item.seller_product_status && item.buyer_product_status,
      //   },
      // });

      synced++;
    }

    // Log sync
    // await prisma.setting.upsert({
    //   where: { key: "last_sync" },
    //   update: { value: new Date().toISOString() },
    //   create: { key: "last_sync", value: new Date().toISOString() },
    // });

    return ok({ synced, skipped, total: list.length, syncedAt: new Date().toISOString() });

  } catch (e) {
    console.error("Sync error:", e);
    return err("Gagal sync Digiflazz: " + e.message, 500);
  }
}
