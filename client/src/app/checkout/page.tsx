"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppStore } from "@/store/store";
import { createOrder } from "@/lib/api/orders";
import StripeForm from "./components/stripe-form";

const stripePromise = loadStripe("pk_test_xeqIPdYS2PpKbHmKG4gJqpde");

const Page = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { ordersInfo } = useAppStore();

  useEffect(() => {
    const handleCreateOrder = async () => {
      const response = await createOrder(ordersInfo);

      if (response?.client_secret) {
        setClientSecret(response?.client_secret);
      }
      console.log({ response });
    };
    if (ordersInfo) {
      handleCreateOrder();
      console.log({ clientSecret });
    } else {
      console.log("no orders");
    }
  }, [ordersInfo]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret.length > 0 && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Page;
