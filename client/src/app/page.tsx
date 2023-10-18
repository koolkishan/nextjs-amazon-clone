"use client";
import { AppleCards } from "@/components/client/apple-cards";
import { HomeCards } from "@/components/client/home-cards";
import { HomeCarousels } from "@/components/client/home-carousels";
import { PrimeVideo } from "@/components/client/prime-video";
import { ProductGrid } from "@/components/client/product-grid";
import { getAllProducts } from "@/lib/api/products";
import { useAppStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { setToast } = useAppStore();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response) {
        setProducts(response);
      }
    };
    fetchProducts();
  }, [setToast]);

  return (
    <div className="flex gap-10 flex-col mb-10">
      <HomeCarousels />
      <ProductGrid products={products} title="Related to items you've viewed" />
      <AppleCards />
      <ProductGrid products={products} title="Inspired by shopping trends" />
      <PrimeVideo />
      <ProductGrid products={products} title="Today's Deals" />
      <HomeCards />
      <ProductGrid products={products} title="Your browsing history" />
    </div>
  );
}
