import React from "react";
import { FaLock } from "react-icons/fa";

const PaymentInfo = () => {
  const data = { price: "500", originalPrice: "700" };
  return (
    <div className="m-2 ml-5 p-5 border-2 border-gray-200 rounded-sm min-h-[50%] h-max w-max">
      <h4 className="font-medium">Price</h4>
      <div className="flex gap-2 items-center">
        <span className="font-medium text-red-500 ">${data.price}</span>
        <span className="font-medium line-through text-sm">
          ${data.originalPrice}
        </span>
      </div>
      <div className="text-sm mt-2">Save extra with no cost EMI</div>
      <div className="text-sm">Get it by tommorow, 21 September</div>
      <div className="text-green-500 font-semibold">In stock</div>
      <button className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex  px-3 py-2 pt-1 gap-10 font-bold w-full items-center justify-center my-3">
        Add to Cart
      </button>
      <button className="bg-amazon-blue hover:bg-[#019bcf] transition-all duration-300 text-white rounded flex  px-3 py-2 gap-10 font-bold w-full items-center justify-center my-3">
        Buy Now
      </button>
      <div className="flex gap-3 items-center text-gray-600">
        <FaLock />
        Secure transaction
      </div>
    </div>
  );
};

export default PaymentInfo;
