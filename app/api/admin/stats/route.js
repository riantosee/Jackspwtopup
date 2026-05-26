// app/api/admin/stats/route.js
// GET /api/admin/stats?range=7d|30d|today → dashboard analytics

import { requireAdmin, ok, err } from "@/lib/adminAuth";

export async function GET(req) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "7d"; // today | 7d | 30d

  // TODO: Prisma aggregate queries
  // const now   = new Date();
  // const from  = range === "today" ? startOfDay(now) : range === "7d" ? subDays(now, 7) : subDays(now, 30);
  //
  // const [revenue, txCount, txByStatus, topGames, topProducts, dailyRevenue] = await Promise.all([
  //   prisma.transaction.aggregate({ where: { status:"SUCCESS", createdAt:{gte:from} }, _sum:{totalAmount:true} }),
  //   prisma.transaction.count({ where: { createdAt:{gte:from} } }),
  //   prisma.transaction.groupBy({ by:["status"], where:{createdAt:{gte:from}}, _count:true }),
  //   prisma.transaction.groupBy({ by:["gameName"], where:{status:"SUCCESS",createdAt:{gte:from}}, _sum:{totalAmount:true}, orderBy:{_sum:{totalAmount:"desc"}}, take:5 }),
  //   prisma.transaction.groupBy({ by:["productName"], where:{status:"SUCCESS",createdAt:{gte:from}}, _count:true, orderBy:{_count:{productName:"desc"}}, take:5 }),
  //   // daily revenue untuk chart
  //   prisma.$queryRaw`SELECT DATE(created_at) as date, SUM(total_amount) as revenue, COUNT(*) as tx_count FROM transactions WHERE status='SUCCESS' AND created_at >= ${from} GROUP BY DATE(created_at) ORDER BY date ASC`,
  // ]);

  // Dummy stats
  const stats = {
    range,
    summary: {
      revenue:       9950000,
      txTotal:       143,
      txSuccess:     128,
      txFailed:      8,
      txPending:     7,
      successRate:   89.5,
      avgOrderValue: 77734,
    },
    byStatus: [
      { status:"success",    count:128, amount:9950000 },
      { status:"failed",     count:8,   amount:0 },
      { status:"pending",    count:5,   amount:0 },
      { status:"processing", count:2,   amount:0 },
    ],
    topGames: [
      { game:"Mobile Legends", revenue:4200000, txCount:58 },
      { game:"Free Fire",      revenue:2100000, txCount:34 },
      { game:"PUBG Mobile",    revenue:1890000, txCount:21 },
      { game:"Genshin Impact", revenue:980000,  txCount:9  },
      { game:"Valorant",       revenue:780000,  txCount:6  },
    ],
    topProducts: [
      { product:"514 Diamonds",  game:"Mobile Legends", count:89 },
      { product:"355 Diamonds",  game:"Free Fire",      count:67 },
      { product:"325 UC",        game:"PUBG Mobile",    count:45 },
      { product:"172 Diamonds",  game:"Mobile Legends", count:43 },
      { product:"1000 VP",       game:"Valorant",       count:21 },
    ],
    topPayments: [
      { method:"QRIS",    count:62, amount:4800000 },
      { method:"DANA",    count:28, amount:2100000 },
      { method:"GoPay",   count:19, amount:1500000 },
      { method:"BCA VA",  count:12, amount:980000  },
      { method:"OVO",     count:7,  amount:570000  },
    ],
    dailyChart: [
      { date:"2025-05-19", revenue:842000,  txCount:12 },
      { date:"2025-05-20", revenue:1240000, txCount:18 },
      { date:"2025-05-21", revenue:980000,  txCount:14 },
      { date:"2025-05-22", revenue:1560000, txCount:22 },
      { date:"2025-05-23", revenue:2100000, txCount:31 },
      { date:"2025-05-24", revenue:1890000, txCount:27 },
      { date:"2025-05-25", revenue:1338000, txCount:19 },
    ],
    voucherStats: {
      totalUsed:   160,
      totalDiscount: 1240000,
      mostUsed:    "NEWUSER",
    },
    promoStats: {
      activePromos: 3,
      totalUsed:    390,
    },
    adStats: {
      totalViews:  58100,
      totalClicks: 1649,
      avgCtr:      2.84,
    },
  };

  return ok(stats);
}
