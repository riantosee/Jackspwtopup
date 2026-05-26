// app/api/admin/products/route.js
// GET  /api/admin/products        → list semua produk
// POST /api/admin/products        → update harga/status produk
// PUT  /api/admin/products/sync   → sync dari Digiflazz

import { NextResponse } from "next/server";
import { requireAdmin, ok, err } from "@/lib/adminAuth";

// GET - list produk dengan filter
export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const game   = searchParams.get("game");
  const active = searchParams.get("active");

  // TODO: replace dengan Prisma query
  // const where = {};
  // if (game)   where.gameSlug = game;
  // if (active) where.isActive = active === "true";
  // const products = await prisma.product.findMany({ where, orderBy: { priceSell: "asc" } });

  // Dummy response
  const products = [
    { sku:"ml-86",   game:"Mobile Legends", name:"86 Diamonds",   hpp:17000,  sell:19000,  active:true,  sold:342 },
    { sku:"ml-514",  game:"Mobile Legends", name:"514 Diamonds",  hpp:97000,  sell:107000, active:true,  sold:891 },
    { sku:"ff-355",  game:"Free Fire",      name:"355 Diamonds",  hpp:65000,  sell:72000,  active:true,  sold:634 },
    { sku:"gi-980",  game:"Genshin Impact", name:"980 Genesis",   hpp:196000, sell:215000, active:false, sold:89  },
  ];

  return ok(products, { total: products.length });
}

// POST - update harga/status 1 produk
export async function POST(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const body = await req.json();
  const { sku, sell, active } = body;

  if (!sku) return err("SKU wajib diisi");

  // Validasi margin minimum (jangan sampai rugi)
  // const product = await prisma.product.findUnique({ where: { sku } });
  // if (sell && sell < product.hpp) return err("Harga jual tidak boleh lebih rendah dari HPP");

  // await prisma.product.update({
  //   where: { sku },
  //   data: {
  //     ...(sell   !== undefined && { priceSell: sell }),
  //     ...(active !== undefined && { isActive:  active }),
  //   },
  // });

  return ok({ sku, sell, active, updatedAt: new Date().toISOString() });
}
