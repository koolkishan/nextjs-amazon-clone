"use client";
import { recordStripePayment } from "@/lib/api/orders";
import { useAppStore } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { emptyCart } = useAppStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    const updateOrderInfo = async () => {
      const response = await recordStripePayment(paymentIntent as string);
    };
    if (paymentIntent) {
      updateOrderInfo();
      emptyCart();
      setTimeout(() => router.push("/my-orders"), 3000);
    }
  }, [emptyCart, router, paymentIntent]);

  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the orders page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  );
};

export default Page;
