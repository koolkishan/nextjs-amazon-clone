"use client";
import React, { useEffect, useState } from "react";
import { Filters } from "./components/filters";
import { Product } from "./components/product";
import { BiRepeat } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { getSearchResults } from "@/lib/api/search";
import { ProductType } from "@/utils/types";

const Page = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");
  const category = searchParams.get("category");
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const response: ProductType[] = await getSearchResults(
        searchTerm as string,
        category ?? ""
      );

      setProducts(response ?? []);
    };
    if (searchTerm || category) {
      getProducts();
    }
  }, [searchTerm, category]);

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
          {products.map((product) => (
            <Product key={product.id} productDetails={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
