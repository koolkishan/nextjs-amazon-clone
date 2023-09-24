import dynamic from "next/dynamic";
import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const CategorySales = ({ data }) => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="sales"
        cx={200}
        cy={150}
        outerRadius={60}
        fill="#8884d8"
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default dynamic(() => Promise.resolve(CategorySales), {
  ssr: false,
});
