import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
const Product = ({
  productData,
}: {
  productData: {
    id: number;
    title: string;
    color: string;
    quantity: string;
    price: string;
    image: string;
  };
}) => {
  return (
    <div className="flex gap-10 bg-gray-100 p-10 rounded-sm items-center ">
      <div>
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-amazon-primary bg-gray-100 border-gray-300 rounded focus:ring-amazon-primary accent-amazon-primary"
        />
      </div>
      <div className="relative h-24 w-24">
        <Image src={productData.image} fill alt="product" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{productData.title}</h3>
        <div className="flex gap-5  text-sm mt-2">
          <div className="flex gap-1">
            <span>Color:</span>
            <span className="font-bold">Titanium White</span>
          </div>
          <div>
            <span>Storage:</span>
            <span className="font-bold">256GB</span>
          </div>
        </div>
      </div>
      <div className="flex gap-5 font-bold ">
        <span>+</span>
        <span>{productData.quantity}</span>
        <span>−</span>
      </div>
      <div>
        <strong>{productData.price}</strong>
      </div>
      <div className="cursor-pointer">
        <FaTrash />
      </div>
    </div>
  );
};

export default Product;
