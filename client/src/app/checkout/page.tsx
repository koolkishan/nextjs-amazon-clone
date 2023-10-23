"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppStore } from "@/store/store";
import { createOrder } from "@/lib/api/orders";
import StripeForm from "./components/stripe-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

const stripePromise = loadStripe("pk_test_xeqIPdYS2PpKbHmKG4gJqpde");

const Page = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { ordersInfo, setToast, emptyCart } = useAppStore();
  const router = useRouter();
  const [isCod, setisCod] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  useEffect(() => {
    const handleCreateOrder = async () => {
      const response = await createOrder(ordersInfo);

      if (
        ordersInfo.status.paymentMode === "stripe" &&
        response?.client_secret
      ) {
        setClientSecret(response?.client_secret);
      }
      setOrderCreated(true);
    };
    if (ordersInfo) {
      handleCreateOrder();
      if (ordersInfo.status.paymentMode === "cash-on-delivery") {
        setisCod(true);
        emptyCart();
      }
    } else {
      setToast("Please add product in cart.");
      router.push("/");
    }
  }, [ordersInfo, emptyCart, router, setToast]);

  const appearance = {};
  const options = {};
  return (
    <div>
      {orderCreated && (
        <>
          {!isCod && clientSecret.length > 0 && (
            <Elements
              options={{ clientSecret, appearance: { theme: "stripe" } }}
              stripe={stripePromise}
            >
              <StripeForm clientSecret={clientSecret} />
            </Elements>
          )}
          {isCod && (
            <h2 className="flex items-center justify-center h-[80vh] w-full text-3xl gap-2">
              <span>Order Created Successfully.</span>
              <Link href="/my-orders" className="underline">
                View orders.
              </Link>
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
