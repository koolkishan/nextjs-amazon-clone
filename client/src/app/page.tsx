import { AppleCards } from "@/components/client/apple-cards";
import { HomeCards } from "@/components/client/home-cards";
import { HomeCarousels } from "@/components/client/home-carousels";
import { PrimeVideo } from "@/components/client/prime-video";
import { ProductGrid } from "@/components/client/product-grid";
import Image from "next/image";

export default function Home() {
  const products = [
    {
      id: "1",
      name: "Apple Iphon 15 Pro - Red",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product1.png",
    },
    {
      id: "1",
      name: "Apple Iphon 15 Pro - Red",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product1.png",
    },
    ,
    {
      id: "1",
      name: "Apple Iphon 15 Pro - Red",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product1.png",
    },
    ,
    {
      id: "1",
      name: "Apple Iphon 15 Pro - Red",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product1.png",
    },
    ,
    {
      id: "1",
      name: "Apple Iphon 15 Pro - Red",
      price: "300",
      ratings: {
        count: 3000,
        average: "4",
      },
      image: "/products/product1.png",
    },
  ];
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
