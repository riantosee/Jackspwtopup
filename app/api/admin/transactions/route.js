// app/api/admin/transactions/route.js
// GET  /api/admin/transactions              → list transaksi dengan filter & pagination
// POST /api/admin/transactions/retry        → retry transaksi gagal ke Digiflazz
// POST /api/admin/transactions/refund       → refund manual

import { NextResponse } from "next/server";
import { requireAdmin, ok, err } from "@/lib/adminAuth";

// GET - list transaksi
export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const status  = searchParams.get("status");   // success|pending|failed|processing
  const search  = searchParams.get("q");         // cari ID/game/user
  const page    = Number(searchParams.get("page"))  || 1;
  const limit   = Number(searchParams.get("limit")) || 20;
  const dateFrom = searchParams.get("from");
  const dateTo   = searchParams.get("to");

  // TODO: Prisma query
  // const where = {};
  // if (status)  where.status    = status.toUpperCase();
  // if (dateFrom) where.createdAt = { gte: new Date(dateFrom) };
  // if (dateTo)   where.createdAt = { ...where.createdAt, lte: new Date(dateTo) };
  // if (search) {
  //   where.OR = [
  //     { txCode:    { contains: search, mode: "insensitive" } },
  //     { gameName:  { contains: search, mode: "insensitive" } },
  //     { targetId:  { contains: search } },
  //   ];
  // }
  // const [data, total] = await Promise.all([
  //   prisma.transaction.findMany({ where, skip: (page-1)*limit, take: limit, orderBy: { createdAt: "desc" } }),
  //   prisma.transaction.count({ where }),
  // ]);

  // Dummy
  const data = [
    { id:"TRX-A1B2C3", game:"Mobile Legends", product:"514 Diamonds", amount:107000, method:"QRIS", status:"success", date:"2025-05-25 14:32", user:"081234567890" },
    { id:"TRX-M4N5O6", game:"Valorant",        product:"1000 VP",      amount:100000, method:"QRIS", status:"failed",  date:"2025-05-25 13:40", user:"084567890123" },
  ];

  return ok(data, {
    pagination: { page, limit, total: data.length, totalPages: Math.ceil(data.length / limit) },
  });
}

// POST - retry / refund
export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { action, txCode } = await req.json();

  if (!txCode) return err("txCode wajib diisi");

  // const tx = await prisma.transaction.findUnique({ where: { txCode } });
  // if (!tx) return err("Transaksi tidak ditemukan", 404);

  if (action === "retry") {
    // if (tx.status !== "FAILED") return err("Hanya transaksi gagal yang bisa di-retry");

    // Kirim ulang ke Digiflazz
    // const crypto = (await import("crypto")).default;
    // const sign = crypto.createHmac("md5")...
    // const digiRes = await createTransaction({ sku: tx.productSku, targetId: tx.targetId, refId: tx.txCode + "_RETRY" });
    // await prisma.transaction.update({ where: { txCode }, data: { status: "PROCESSING", note: "Manual retry by admin" } });

    return ok({ txCode, action: "retry", message: "Transaksi dikirim ulang ke Digiflazz", retriedAt: new Date().toISOString() });
  }

  if (action === "refund") {
    // if (!["FAILED","PAID"].includes(tx.status)) return err("Status tidak memenuhi syarat refund");
    // await prisma.transaction.update({ where: { txCode }, data: { status: "REFUNDED", note: "Manual refund by admin" } });
    // TODO: proses refund ke payment gateway jika perlu

    return ok({ txCode, action: "refund", message: "Transaksi berhasil direfund", refundedAt: new Date().toISOString() });
  }

  return err("Action tidak dikenali. Gunakan 'retry' atau 'refund'");
}
