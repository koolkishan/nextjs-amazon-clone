import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLock } from "react-icons/fa";

const PaymentInfo = ({
  data,
}: {
  data: { id: string; originalPrice: number; price: number };
}) => {
  const router = useRouter();
  const { addToCart } = useAppStore();
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
      <div className="text-sm">Get it by {getRandomDateInNext7Days()}</div>
      <div className="text-green-500 font-semibold">In stock</div>
      <button
        className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex  px-3 py-2 pt-1 gap-10 font-bold w-full items-center justify-center my-3"
        onClick={() => addToCart(data.id, data.price)}
      >
        Add to Cart
      </button>
      <button
        className="bg-amazon-blue hover:bg-[#019bcf] transition-all duration-300 text-white rounded flex  px-3 py-2 gap-10 font-bold w-full items-center justify-center my-3"
        onClick={() => {
          addToCart(data.id, data.price);
          router.push("/cart");
        }}
      >
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
