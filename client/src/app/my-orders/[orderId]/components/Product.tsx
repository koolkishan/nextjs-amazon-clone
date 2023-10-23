import { ProductType } from "@/utils/types";
import Image from "next/image";
import React from "react";

const Product = ({ productData }: { productData: ProductType }) => {
  return (
    <div className="flex gap-10 bg-gray-100 p-10 rounded-sm items-center ">
      <div className="relative h-24 w-24">
        <Image src={productData.images[0]} fill alt="product" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{productData.title}</h3>
        <div className="flex gap-5  text-sm mt-2">
          <div className="flex gap-1">
            <span>Color:</span>
            <span className="font-bold">Titanium White</span>
          </div>
          <div>
            <span>Variant:</span>
            <span className="font-bold">{productData.variants[0]}</span>
          </div>
        </div>
      </div>

      <div className="w-16 text-center">
        <strong>${productData.discountPrice}</strong>
      </div>
    </div>
  );
};

export default Product;
