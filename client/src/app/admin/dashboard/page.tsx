"use client";
import React, { useEffect, useState } from "react";
import { Stats } from "./components/stats";
import { CategorySales } from "./components/charts/category-sales";
import DailyRevenue from "./components/charts/daily-revenue/daily-revenue";
import { MonthlySales } from "./components/charts/monthly-sales";
import { RecentOrders } from "./components/recent-orders";
import { Card, CardHeader } from "@nextui-org/react";
import axios from "axios";

interface User {
  username: string;
}

interface RevenueData {
  date: string;
  revenue: number;
}

interface RecentOrder {
  id: string;
  price: number;
  user: User;
}

interface TopCategory {
  id: string;
  name: string;
  revenue: number;
}

interface YearlySalesData {
  month: string;
  sales: number;
}

interface Stats {
  category: number;
  products: number;
  users: number;
  orders: number;
  revenue: number;
}

interface DashbordAPIResponseType {
  stats: Stats;
  revenueData: RevenueData[];
  recentOrders: RecentOrder[];
  top5Categories: TopCategory[];
  yearlySalesData: YearlySalesData[];
}

const Page = () => {
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [dailyRevenueData, setDailyRevenueData] = useState<RevenueData[]>([]);
  const [categorySalesData, setCategorySalesData] = useState<TopCategory[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [monthlySales, setMonthlySales] = useState<YearlySalesData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axios.get<DashbordAPIResponseType>(
          "http://localhost:5000/admin/dashboard/api"
        );

        if (response?.data?.stats) {
          setStats(response.data?.stats);
          setDailyRevenueData(response.data?.revenueData);
          setCategorySalesData(response?.data?.top5Categories);
          setRecentOrders(response.data?.recentOrders);
          setMonthlySales(response.data?.yearlySalesData);
        }
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getDashboardData();
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="m-10">
          <div className="flex justify-between gap-5">
            <Stats title="Total category" data={stats?.category ?? 0} />
            <Stats title="Total products" data={stats?.products ?? 0} />
            <Stats title="Total users" data={stats?.users ?? 0} />
            <Stats title="Total orders" data={stats?.orders ?? 0} />
            <Stats title="Total revenue" data={stats?.revenue ?? 0} />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="h-full min-h-[50vh]">
              <Card className="h-full px-5">
                <CardHeader className="text-lg m-2 font-semibold">
                  Daily Revenue
                </CardHeader>
                <DailyRevenue data={dailyRevenueData} />
              </Card>
            </div>
            <div className="h-full">
              <Card className="h-full px-5">
                <CardHeader className="text-lg m-2 font-semibold">
                  Monthly Sales
                </CardHeader>
                <MonthlySales data={monthlySales} />
              </Card>
            </div>
            <div className="h-full">
              <Card className="h-full px-5">
                <CardHeader className="text-lg m-2 font-semibold">
                  Sale by Category
                </CardHeader>
                <CategorySales data={categorySalesData} />
              </Card>
            </div>
            <RecentOrders data={recentOrders} />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
