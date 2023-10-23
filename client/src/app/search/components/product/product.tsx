import Image from "next/image";
import React, { useState } from "react";
import { Ratings } from "./ratings";
import { Colors } from "./colors";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import { ProductType } from "@/utils/types";

const Product = ({ productDetails }: { productDetails: ProductType }) => {
  const router = useRouter();
  const { addToCart } = useAppStore();

  const handleClick = () => {
    router.push(`/product/${productDetails.id}`);
  };

  function getRandomDateInNext7Days() {
    const currentDate = new Date();
    const next7Days = new Date(currentDate);
    next7Days.setDate(currentDate.getDate() + 7);

    const randomDate = new Date(
      currentDate.getTime() +
        Math.random() * (next7Days.getTime() - currentDate.getTime())
    );

    const options = {
      day: "numeric",
      month: "long",
    } as Intl.DateTimeFormatOptions;
    const formattedDate = randomDate.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const [deliveryDate, setDeliveryDate] = useState(getRandomDateInNext7Days());

  return (
    <div className="flex gap-4 cursor-pointer items-center w-full ">
      <div
        className="bg-gray-100 h-72 w-96 flex items-center justify-center rounded"
        onClick={handleClick}
      >
        <div className="relative h-44 w-64">
          <Image src={productDetails.images[0]} alt="product" fill />
        </div>
      </div>
      <div className="  w-full">
        <div onClick={handleClick}>
          <h3 className="text-amazon-dark hover:text-amazon-primary transition-all duration-300">
            <strong className="font-medium">{productDetails.title}</strong>
          </h3>
          <Ratings />
          <div className="flex items-center gap-2 mt-2 ">
            <div className="text-2xl font-semibold">
              ${productDetails.discountPrice}
            </div>
            <div className="text-gray-600 font-medium">
              List Price:
              <span className="line-through">
                {" "}
                ${+productDetails.salePrice}
              </span>
            </div>
          </div>
          <div className="text-sm mb-1">Save extra with no cost EMI</div>
          <div className="text-sm mb-3">Get it by {deliveryDate}¸</div>
          <Colors colors={productDetails.colors} />
        </div>
        <div className="flex gap-2 w-full">
          <button
            className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex  px-3 py-2 gap-10 font-bold w-52 items-center justify-center my-3"
            onClick={() =>
              addToCart(productDetails.id, productDetails.discountPrice)
            }
          >
            Add to Cart
          </button>
          <button
            className="bg-amazon-blue hover:bg-[#019bcf] transition-all duration-300 text-white rounded flex  px-3 py-2 gap-10 font-bold w-52 items-center justify-center my-3"
            onClick={() => {
              addToCart(productDetails.id, productDetails.discountPrice);
              router.push("/cart");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
