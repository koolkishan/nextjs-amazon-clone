"use client";
// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// export default function Page() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: "http://localhost:3000/success",
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit} className="w-96">
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button
//         disabled={isLoading || !stripe || !elements}
//         id="submit"
//         className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md mt-5 w-full"
//       >
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// }

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppStore } from "@/store/store";
import { createOrder } from "@/lib/api/orders";

const stripePromise = loadStripe("pk_test_xeqIPdYS2PpKbHmKG4gJqpde");

const Page = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { ordersInfo } = useAppStore();

  useEffect(() => {
    const handleCreateOrder = async () => {
      const response = await createOrder(ordersInfo);
      console.log({ response });
    };
    if (ordersInfo) {
      handleCreateOrder();
    } else {
      console.log("no orders");
    }
  }, [ordersInfo]);

  return <div>page</div>;
};

export default Page;