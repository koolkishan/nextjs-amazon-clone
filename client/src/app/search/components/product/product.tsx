import Image from "next/image";
import React from "react";
import { Ratings } from "./ratings";
import { Colors } from "./colors";
import { useRouter } from "next/navigation";

const Product = () => {
  const router = useRouter();
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
  };
  const handleClick = () => {
    router.push(`/product/${productDetails.id}`);
  };
  return (
    <div className="flex gap-4 cursor-pointer items-center w-full ">
      <div className="bg-gray-100 p-10 rounded" onClick={handleClick}>
        <Image
          src={productDetails.image}
          alt="product"
          height={100}
          width={150}
        />
      </div>
      <div className="  w-full">
        <div onClick={handleClick}>
          <h3 className="text-amazon-dark hover:text-amazon-primary transition-all duration-300">
            <strong className="font-medium">{productDetails.name}</strong>
          </h3>
          <Ratings />
          <div className="flex items-center gap-2 mt-2 ">
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
          <div className="text-sm mb-1">Save extra with no cost EMI</div>
          <div className="text-sm mb-3">Get it by tommorow, 21 September</div>
          <Colors colors={productDetails.colors} />
        </div>
        <div className="flex gap-2 w-full">
          <button className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex  px-3 py-2 gap-10 font-bold w-52 items-center justify-center my-3">
            Add to Cart
          </button>
          <button className="bg-amazon-blue hover:bg-[#019bcf] transition-all duration-300 text-white rounded flex  px-3 py-2 gap-10 font-bold w-52 items-center justify-center my-3">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
