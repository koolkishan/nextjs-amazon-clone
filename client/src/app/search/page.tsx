"use client";
import React, { useState } from "react";
import { Filters } from "./components/filters";
import { Product } from "./components/product";
import { BiRepeat } from "react-icons/bi";

const Page = () => {
  const productsData = [{ id: 1 }];
  const [first, setFirst] = useState(3);
  return (
    <div className="grid mt-5" style={{ gridTemplateColumns: "15% 85%" }}>
      <Filters />
      <div>
        <div>
          <h3 className="mb-3">
            <strong className="font-semibold">Results</strong>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-10 pb-10">
          {productsData.map((product) => (
            <Product key={product.id} />
          ))}
          {productsData.map((product) => (
            <Product key={product.id} />
          ))}
          {productsData.map((product) => (
            <Product key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
