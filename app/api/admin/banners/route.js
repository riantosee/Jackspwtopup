// app/api/admin/banners/route.js
// GET    /api/admin/banners        → list banner slider
// POST   /api/admin/banners        → tambah banner
// PUT    /api/admin/banners        → update banner
// DELETE /api/admin/banners?id=xxx → hapus banner

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  // const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  const banners = [
    { id:1, title:"MLBB × NARUTO",        tag:"Kolaborasi",    bg:"#050d1a", accent:"#4a9eff", active:true,  order:1 },
    { id:2, title:"FREE FIRE BOOYAH DAY", tag:"Event",         bg:"#130800", accent:"#ff6b35", active:true,  order:2 },
    { id:3, title:"GENSHIN 5.0 UPDATE",   tag:"Flash Sale",    bg:"#06081a", accent:"#a8d8ea", active:false, order:3 },
  ];

  return ok(banners);
}

export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { title, tag, bg, accent, subtitle, linkUrl } = body;

  if (!title) return err("title wajib diisi");

  // const banner = await prisma.banner.create({
  //   data: { title, tag, bg, accent, subtitle, linkUrl, isActive: true, sortOrder: 99 },
  // });

  const banner = { id: Date.now(), title, tag, bg, accent, subtitle, linkUrl, active: true, order: 99, createdAt: new Date().toISOString() };

  return ok(banner);
}

export async function PUT(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return err("id wajib diisi");

  // await prisma.banner.update({ where: { id }, data: updates });

  return ok({ id, ...updates, updatedAt: new Date().toISOString() });
}

export async function DELETE(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return err("id wajib diisi");

  // await prisma.banner.delete({ where: { id: Number(id) } });

  return ok({ deleted: id });
}
