"use client";
import React from "react";
import { ImageSlider } from "./components/image-slider";
import { TrustSlider } from "./components/trust-slider";
import { Colors } from "./components/colors";
import { Variants } from "./components/variants";
import { ReviewBars } from "./components/review-bars";
import { Reviews } from "./components/reviews";
import { Ratings } from "@/app/search/components/product/ratings";
import { FaCaretDown } from "react-icons/fa";
import { PaymentInfo } from "./components/payment-info";

const Page = () => {
  const productDetails = {
    id: "1",
    name: "Apple Iphon 15 Pro - Red",
    price: "300",
    ratings: {
      count: 3000,
      average: "4",
    },
    image: "/products/product1.png",
    colors: ["#3f0499", "#369904", "#eeb124", "#ca146f", "#1bc1e3"],
    variants: ["128GB", "256GB", "512GB"],
    stats: [
      "15.40 cm (6.1-inch) Super Retina XDR display",
      "Advanced camera system for better photos in any light",
      "Cinematic mode now in 4K Dolby Vision up to 30 fps",
      "Action mode for smooth, steady, handheld videos",
      "Vital safety technology — Crash Detection calls for help when you can’t",
      "All-day battery life and up to 20 hours of video playback",
      "Industry-leading durability features with Ceramic Shield and water resistance",
    ],
  };
  return (
    <div className="mt-5 mx-10">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "50% 25% 25%" }}
      >
        <div>
          <ImageSlider />
        </div>
        <div>
          <div>
            <h4 className="font-semibold text-2xl">{productDetails.name}</h4>
            <div className="flex items-center gap-2">
              <Ratings />
              <span className="text-amazon-blue underline text-sm">
                {productDetails.ratings.count}
              </span>
            </div>
            <div className="border-t border-t-gray-300 border-b border-b-gray-300 py-2 my-2">
              <div className="flex  gap-2 mt-2 flex-col">
                <div className="flex gap-2 items-center">
                  <div className="text-2xl font-semibold">
                    ${productDetails.price}
                  </div>
                  <div className="text-gray-600 font-medium">
                    List Price:
                    <span className="line-through">
                      {" "}
                      ${+productDetails.price + 300}
                    </span>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm">Inclusive of all taxes</h6>
                  <div className="flex gap-3 items-center">
                    <h6 className="text-sm">No Cost EMI available</h6>
                    <h6 className="text-xs text-amazon-blue underline flex items-center cursor-pointer">
                      EMI Options
                      <FaCaretDown />
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TrustSlider />
          <Colors colors={productDetails.colors} />
          <Variants variants={productDetails.variants} />
          <div className="mt-3">
            <h5 className="text-sm font-semibold">About this item</h5>
            <ul className="text-sm flex flex-col gap-1 list-disc pl-3">
              {productDetails.stats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          </div>
        </div>
        <PaymentInfo />
      </div>
      <div>
        {/* <ReviewBars /> */}
        {/* <Reviews /> */}
      </div>
    </div>
  );
};

export default Page;
