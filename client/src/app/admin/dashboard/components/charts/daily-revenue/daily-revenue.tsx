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
} from "recharts";

const DailyRevenue = ({ data }) => {
  return (
    <AreaChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />
    </AreaChart>
  );
};

export default dynamic(() => Promise.resolve(DailyRevenue), {
  ssr: false,
});
