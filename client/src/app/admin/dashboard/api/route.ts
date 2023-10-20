import { NextResponse } from "next/server";

import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const category = await prisma.category.count();
    const products = await prisma.product.count();
    const users = await prisma.user.count();
    const orders = await prisma.order.findMany();

    const revenue = orders.reduce(
      (total, order) => total + (order.price || 0),
      0
    );

    const stats = {
      category,
      products,
      users,
      orders: orders.length,
      revenue,
    };

    const revenueData = await prisma.$queryRaw`
  SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') as "date", SUM("price") as "revenue"
  FROM "Order"
  GROUP BY "date"
  ORDER BY "date" 
  LIMIT 30;
`;
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc", // Order by the createdAt date in descending order to get the latest orders.
      },
      select: {
        id: true,
        price: true,
        user: {
          select: { username: true },
        },
      },
    });

    const topCategories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            discountPrice: true,
          },
        },
      },
    });

    const categoriesWithRevenue = topCategories.map((category) => ({
      id: category.id,
      name: category.name,
      revenue: category.products.reduce(
        (total, product) => total + (product.discountPrice || 0),
        0
      ),
    }));

    const sortedCategories = categoriesWithRevenue.sort(
      (a, b) => b.revenue - a.revenue
    );

    const top5Categories = sortedCategories.slice(0, 5);

    const yearlySalesData = await prisma.$queryRaw`
      SELECT 
        TO_CHAR("createdAt", 'Month') as "month",
        SUM("price") as "sales"
      FROM "Order"
      WHERE "createdAt" >= '2023-01-01' AND "createdAt" <= '2023-12-31'
      GROUP BY "month"
      ORDER BY MIN("createdAt");
    `;

    return NextResponse.json({
      stats,
      revenueData,
      recentOrders,
      top5Categories,
      yearlySalesData,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  } finally {
    await prisma.$disconnect();
  }
}
