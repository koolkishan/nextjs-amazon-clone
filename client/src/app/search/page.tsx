"use client";
import React, { useEffect, useState } from "react";
import { Filters } from "./components/filters";
import { Product } from "./components/product";
import { BiRepeat } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { getSearchResults } from "@/lib/api/search";

const Page = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await getSearchResults(searchTerm as string);
      setProducts(response);
    };
    if (searchTerm) {
      getProducts();
    }
  }, [searchTerm]);

  const productsData = [
    {
      id: "1",
      name: "Apple Iphon 15 Pro - Red",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product1.png",
      colors: ["#3f0499", "#369904", "#eeb124", "#ca146f", "#1bc1e3"],
    },
    {
      id: "2",
      name: "Samsung Galaxy S23",
      price: "480",
      ratings: {
        count: 2400,
        average: "5",
      },
      image: "/products/product2.webp",
      colors: ["#3f0499", "#369904", "#eeb124", "#ca146f", "#1bc1e3"],
    },
    {
      id: "3",
      name: "Xioami S11 Sand White",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product3.webp",
      colors: ["#3f0499", "#369904", "#eeb124", "#ca146f", "#1bc1e3"],
    },
  ];
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
          {products.map((product) => (
            <Product key={product.id} productDetails={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
