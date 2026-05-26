// lib/adminAuth.js
// Middleware guard untuk semua API admin
// Cara pakai: import { requireAdmin } from "@/lib/adminAuth"

import { NextResponse } from "next/server";

export function requireAdmin(req) {
  const token = req.headers.get("x-admin-token") ||
                req.cookies?.get("admin_token")?.value;

  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  return null; // null = lolos auth
}

// Helper response
export const ok  = (data, meta)  => NextResponse.json({ success: true,  data, ...meta });
export const err = (msg, status) => NextResponse.json({ success: false, message: msg }, { status: status || 400 });
