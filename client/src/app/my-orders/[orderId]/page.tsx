"use client";

import { getOrder } from "@/lib/api/orders";
import React, { useEffect, useState } from "react";
import { Product } from "./components";
import { ProductType } from "@/utils/types";

interface OrderStatusType {
  paymentMode: "stripe" | "cash-on-delivery";
}
interface OrderType {
  products: ProductType[];
  price: string;
  status: OrderStatusType;
  paymentStatus: boolean;
}

const Page = ({ params: { orderId } }: { params: { orderId: string } }) => {
  const [order, setOrder] = useState<OrderType | undefined>(undefined);
  useEffect(() => {
    const getData = async () => {
      const response = await getOrder(orderId);
      setOrder(response);
    };

    if (orderId) [getData()];
  }, [orderId]);

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
            <div className="flex-1 bg-gray-100 p-10 h-max">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
