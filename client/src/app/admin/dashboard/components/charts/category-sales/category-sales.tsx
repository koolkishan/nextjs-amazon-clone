import dynamic from "next/dynamic";
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const CategorySales = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "100%" }} className="">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            scale={4}
            data={data}
            dataKey="sales"
            cx={300}
            cy={150}
            outerRadius={100}
            fill="#ffb700"
            label
          />
          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CategorySales), {
  ssr: false,
});
