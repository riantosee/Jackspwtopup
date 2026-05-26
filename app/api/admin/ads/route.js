// app/api/admin/ads/route.js
// GET    /api/admin/ads        → list semua iklan + statistik
// POST   /api/admin/ads        → buat iklan baru
// PUT    /api/admin/ads        → update iklan (pause/aktifkan/edit)
// DELETE /api/admin/ads?id=xxx → hapus iklan

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // active|paused

  // const ads = await prisma.ad.findMany({
  //   where: status ? { status } : {},
  //   orderBy: { createdAt: "desc" },
  // });

  const ads = [
    { id:1, name:"Banner Hero Homepage", placement:"Homepage Hero", type:"image",  status:"active", clicks:1240, views:18400, ctr:6.74, start:"2025-05-01", end:"2025-05-31" },
    { id:2, name:"Sidebar MLBB Promo",   placement:"Sidebar Kanan", type:"image",  status:"active", clicks:320,  views:5600,  ctr:5.71, start:"2025-05-15", end:"2025-06-15" },
    { id:3, name:"Pop-up Flash Sale",    placement:"Pop-up",        type:"popup",  status:"paused", clicks:89,   views:2100,  ctr:4.24, start:"2025-05-20", end:"2025-05-25" },
    { id:4, name:"Ticker Text Promo",    placement:"Ticker Bar",    type:"text",   status:"active", clicks:0,    views:32000, ctr:0,    start:"2025-05-01", end:"2025-06-30" },
  ];

  const filtered = status ? ads.filter(a => a.status === status) : ads;

  // Summary stats
  const stats = {
    totalViews:  filtered.reduce((a,b) => a + b.views,  0),
    totalClicks: filtered.reduce((a,b) => a + b.clicks, 0),
    activeCount: filtered.filter(a => a.status === "active").length,
    avgCtr:      filtered.length > 0
      ? (filtered.reduce((a,b) => a + b.ctr, 0) / filtered.length).toFixed(2)
      : 0,
  };

  return ok(filtered, { stats });
}

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { name, placement, type, contentUrl, linkUrl, start, end } = body;

  if (!name || !placement || !type) return err("name, placement, type wajib diisi");

  const VALID_PLACEMENTS = ["Homepage Hero", "Sidebar Kanan", "Pop-up", "Ticker Bar", "Bawah Game Grid", "Halaman Topup"];
  const VALID_TYPES      = ["image", "text", "popup", "video"];

  if (!VALID_PLACEMENTS.includes(placement)) return err("Placement tidak valid");
  if (!VALID_TYPES.includes(type))           return err("Tipe iklan tidak valid");

  if (start && end && new Date(start) > new Date(end)) return err("Tanggal mulai harus sebelum tanggal berakhir");

  // const ad = await prisma.ad.create({
  //   data: { name, placement, type, contentUrl, linkUrl, startDate: new Date(start), endDate: new Date(end), status: "active", clicks: 0, views: 0 },
  // });

  const ad = { id: Date.now(), name, placement, type, contentUrl, linkUrl, start, end, status: "active", clicks: 0, views: 0, ctr: 0, createdAt: new Date().toISOString() };

  return ok(ad);
}

export async function PUT(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { id, action, ...updates } = body;

  if (!id) return err("id wajib diisi");

  // Toggle status via action
  if (action === "pause")    updates.status = "paused";
  if (action === "activate") updates.status = "active";

  // await prisma.ad.update({ where: { id }, data: updates });

  return ok({ id, ...updates, updatedAt: new Date().toISOString() });
}

export async function DELETE(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return err("id wajib diisi");

  // await prisma.ad.delete({ where: { id: Number(id) } });

  return ok({ deleted: id });
}
