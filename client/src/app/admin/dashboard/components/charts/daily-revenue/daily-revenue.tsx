import dynamic from "next/dynamic";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DailyRevenue = ({ data }) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
