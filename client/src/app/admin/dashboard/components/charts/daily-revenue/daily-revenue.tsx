import dynamic from "next/dynamic";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DailyRevenue = ({
  data,
}: {
  data: { date: string; revenue: number }[];
}) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="revenue"
          fill="#ffb700"
          stroke="#ff9900"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default dynamic(() => Promise.resolve(DailyRevenue), {
  ssr: false,
});
