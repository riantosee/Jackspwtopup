// app/api/admin/promos/route.js
// GET    /api/admin/promos         → list semua promo
// POST   /api/admin/promos         → buat promo baru
// PUT    /api/admin/promos         → update promo (aktif/nonaktif, edit)
// DELETE /api/admin/promos?id=xxx  → hapus promo

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("active") === "true";

  // const promos = await prisma.promo.findMany({
  //   where: activeOnly ? { isActive: true, endDate: { gte: new Date() } } : {},
  //   orderBy: { createdAt: "desc" },
  // });

  const promos = [
    { id:"p1", name:"Flash Sale Jumat",   game:"Semua Game",    type:"percent", discount:10,   active:true,  start:"2025-05-23", end:"2025-05-30", used:234 },
    { id:"p2", name:"Bonus MLBB Weekday", game:"Mobile Legends",type:"flat",    discount:5000, active:true,  start:"2025-05-01", end:"2025-05-31", used:89  },
    { id:"p3", name:"Cashback QRIS",      game:"Semua Game",    type:"cashback",discount:3,    active:true,  start:"2025-05-15", end:"2025-06-15", used:156 },
  ];

  return ok(promos, { total: promos.length });
}

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { name, game, type, discount, start, end } = body;

  if (!name || !type || discount === undefined) return err("name, type, discount wajib diisi");
  if (!["percent", "flat", "cashback", "bonus"].includes(type)) return err("Tipe promo tidak valid");
  if (type === "percent" || type === "cashback") {
    if (discount < 0 || discount > 100) return err("Nilai persen harus antara 0-100");
  }
  if (start && end && new Date(start) > new Date(end)) return err("Tanggal mulai harus sebelum tanggal berakhir");

  // const promo = await prisma.promo.create({
  //   data: { name, gameSlug: game || "all", type, discount, startDate: new Date(start), endDate: new Date(end), isActive: true },
  // });

  const promo = { id: Date.now().toString(), name, game: game || "Semua Game", type, discount, start, end, active: true, used: 0, createdAt: new Date().toISOString() };

  return ok(promo);
}

export async function PUT(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return err("id wajib diisi");

  // await prisma.promo.update({ where: { id }, data: { ...updates, updatedAt: new Date() } });

  return ok({ id, ...updates, updatedAt: new Date().toISOString() });
}

export async function DELETE(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return err("id wajib diisi");

  // await prisma.promo.delete({ where: { id } });

  return ok({ deleted: id });
}
