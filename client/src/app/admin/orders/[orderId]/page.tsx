"use client";

import { getOrder, updateOrderPaymentStatus } from "@/lib/api/orders";
import React, { useEffect, useState } from "react";
import { Product } from "./components";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useAppStore } from "@/store/store";

interface ProductType {
  categoryId: string;
  colors: string[];
  createdAt: string;
  description: string[];
  discountPrice: number;
  id: string;
  images: string[];
  salePrice: number;
  title: string;
  updatedAt: string;
  variants: string[];
}

interface Status {
  paymentMode: string;
}

interface User {
  id: string;
}

interface OrderType {
  createdAt: string;
  id: string;
  paymentIntent: string;
  paymentStatus: boolean;
  price: number;
  status: Status;
  updatedAt: string;
  user: User;
  products: ProductType[];
}

const Page = ({ params: { orderId } }: { params: { orderId: string } }) => {
  const { setToast } = useAppStore();
  const [order, setOrder] = useState<OrderType | undefined>(undefined);
  const [paymentStatus, setPaymentStatus] = useState<"completed" | "pending">(
    "pending"
  );
  useEffect(() => {
    const getData = async () => {
      const response = await getOrder(orderId);

      setPaymentStatus(response?.paymentStatus ? "completed" : "pending");
      setOrder(response);
    };

    if (orderId) [getData()];
  }, [orderId]);

  const updatePaymentStatus = async () => {
    const response = await updateOrderPaymentStatus(
      paymentStatus === "completed" ? true : false,
      orderId
    );
    if (response.status === 200) {
      setOrder({
        ...(order as OrderType),
        paymentStatus: paymentStatus === "completed" ? true : false,
      });
      setToast("Order status updated.");
    }
  };

  return (
    <div>
      {order && (
        <div className="px-10 py-10 ">
          <h2 className="mb-10 text-3xl text-amazon-dark">
            <strong>Order Summary</strong>
          </h2>

          <div className="flex gap-10">
            <div className="w-3/4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  {order.products.map((product) => (
                    <Product key={product.id} productData={product} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className=" bg-gray-100 p-10 h-max">
                <div>
                  Order Total: <strong> ${order.price}</strong>
                </div>
                <div>
                  Paymemt Method:
                  <strong>
                    {order.status.paymentMode === "stripe"
                      ? " Stripe"
                      : " Cash on Delivery"}
                  </strong>
                </div>
                <div>
                  Payment Status:
                  <strong>
                    {order.paymentStatus ? " Completed" : " Pending"}
                  </strong>
                </div>
              </div>
              <div className=" bg-gray-100 p-10 ">
                <h2>
                  <strong>Change Payment Status</strong>
                </h2>
                <RadioGroup
                  className="my-4"
                  value={paymentStatus}
                  onValueChange={(value) =>
                    setPaymentStatus(value as "completed" | "pending")
                  }
                >
                  <Radio value="pending" checked={!order.paymentStatus}>
                    Pending
                  </Radio>
                  <Radio value="completed" checked={order.paymentStatus}>
                    Completed
                  </Radio>
                </RadioGroup>
                <button
                  className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex justify-center px-3 py-2 gap-10 font-bold w-full text-center items-center"
                  onClick={() => updatePaymentStatus()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
