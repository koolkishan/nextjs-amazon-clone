import { Ratings } from "@/app/search/components/product/ratings";
import Image from "next/image";
import React from "react";

const ProductGrid = ({ products, title }: any) => {
  return (
    <div className="mx-20 flex flex-col gap-6">
      <div className="flex justify-between ">
        <h4 className="font-semibold">{title}</h4>
        <h4 className="text-amazon-primary">View all</h4>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-start">
              <div className="flex justify-center w-full mb-2">
                <Image
                  src={product.image}
                  height={100}
                  width={100}
                  alt="product"
                />
              </div>

              <h3>{product.name}</h3>
              <div className="flex items-center gap-2">
                <Ratings />
                <span className="text-amazon-blue underline text-sm">
                  {product.ratings.count}
                </span>
              </div>
              <div className="font-medium">
                <span>$</span>
                <span>{product.price}</span>
              </div>

              <div className="text-sm">Get it by tommorow, 21 September</div>
              <div className="text-green-500 font-semibold">In stock</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
