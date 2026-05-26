// app/api/admin/vouchers/route.js
// GET    /api/admin/vouchers         → list semua voucher
// POST   /api/admin/vouchers         → buat voucher baru
// PUT    /api/admin/vouchers         → update voucher
// DELETE /api/admin/vouchers?id=xxx  → hapus voucher

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  // const vouchers = await prisma.voucher.findMany({ orderBy: { createdAt: "desc" } });

  const vouchers = [
    { id:"v1", code:"JACKSFREE", type:"percent", value:10, minTx:50000, maxDisc:15000, used:42,  quota:100, active:true,  exp:"2025-06-30" },
    { id:"v2", code:"NEWUSER",   type:"flat",    value:5000, minTx:20000, maxDisc:5000, used:118, quota:200, active:true,  exp:"2025-12-31" },
  ];

  return ok(vouchers, { total: vouchers.length });
}

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { code, type, value, minTx, maxDisc, quota, exp } = body;

  // Validasi
  if (!code || !type || !value) return err("code, type, dan value wajib diisi");
  if (!["percent", "flat"].includes(type)) return err("type harus 'percent' atau 'flat'");
  if (type === "percent" && (value < 1 || value > 100)) return err("Persen diskon harus antara 1-100");
  if (quota < 1) return err("Kuota minimal 1");

  // Cek duplikat code
  // const existing = await prisma.voucher.findUnique({ where: { code: code.toUpperCase() } });
  // if (existing) return err("Kode voucher sudah digunakan");

  // const voucher = await prisma.voucher.create({
  //   data: { code: code.toUpperCase(), type, value, minTx: minTx || 0, maxDisc: maxDisc || value, quota, exp: new Date(exp), isActive: true },
  // });

  const voucher = { id: Date.now().toString(), code: code.toUpperCase(), type, value, minTx: minTx || 0, maxDisc: maxDisc || value, quota, exp, used: 0, active: true, createdAt: new Date().toISOString() };

  return ok(voucher);
}

export async function PUT(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return err("id wajib diisi");

  // await prisma.voucher.update({ where: { id }, data: updates });

  return ok({ id, ...updates, updatedAt: new Date().toISOString() });
}

export async function DELETE(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return err("id wajib diisi");

  // await prisma.voucher.delete({ where: { id } });

  return ok({ deleted: id });
}
