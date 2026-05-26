// app/api/admin/saldo/route.js
// GET  /api/admin/saldo         → cek saldo Digiflazz real-time + riwayat deposit
// POST /api/admin/saldo/deposit → catat deposit manual

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action"); // "check" = hit Digiflazz API

  let balance = null;

  // Hit Digiflazz untuk saldo real
  if (action === "check") {
    try {
      const crypto     = (await import("crypto")).default;
      const USERNAME   = process.env.DIGIFLAZZ_USERNAME;
      const API_KEY    = process.env.DIGIFLAZZ_API_KEY;
      const sign       = crypto.createHash("md5").update(USERNAME + API_KEY + "depo").digest("hex");

      const res = await fetch("https://api.digiflazz.com/v1/cek-saldo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd: "deposit", username: USERNAME, sign }),
      });
      const data = await res.json();
      balance = data.data?.deposit || 0;
    } catch (e) {
      return err("Gagal cek saldo Digiflazz: " + e.message, 500);
    }
  } else {
    // Ambil dari DB (cached)
    // const setting = await prisma.setting.findUnique({ where: { key: "digiflazz_balance" } });
    // balance = Number(setting?.value) || 0;
    balance = 2450000; // dummy
  }

  // Riwayat deposit dari DB
  // const deposits = await prisma.deposit.findMany({ orderBy: { createdAt: "desc" }, take: 20 });
  const deposits = [
    { id:1, amount:1000000, note:"Transfer BCA", createdAt:"2025-05-24T10:00:00Z", status:"confirmed" },
    { id:2, amount:2000000, note:"Transfer Mandiri", createdAt:"2025-05-20T14:30:00Z", status:"confirmed" },
    { id:3, amount:500000,  note:"Transfer BCA", createdAt:"2025-05-15T09:00:00Z", status:"confirmed" },
  ];

  return ok({ balance, deposits, checkedAt: new Date().toISOString() });
}

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { amount, note } = body;

  if (!amount || amount < 10000) return err("Nominal deposit minimal Rp 10.000");

  // await prisma.deposit.create({
  //   data: { amount: Number(amount), note, status: "confirmed" },
  // });

  // Update cached balance
  // const current = await prisma.setting.findUnique({ where: { key: "digiflazz_balance" } });
  // const newBalance = (Number(current?.value) || 0) + Number(amount);
  // await prisma.setting.upsert({
  //   where: { key: "digiflazz_balance" },
  //   update: { value: String(newBalance) },
  //   create: { key: "digiflazz_balance", value: String(newBalance) },
  // });

  return ok({
    deposited: amount,
    note,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  });
}
