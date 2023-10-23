"use client";
import React, { useEffect, useState } from "react";
import { Product } from "./components/product";
import { useAppStore } from "@/store/store";
import { getMultipleProductDetails } from "@/lib/api/products";
import { CgDanger } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { ProductType } from "@/utils/types";

const Page = () => {
  const { cartProducts, getTotalAmount, userInfo, setOrdersInfo } =
    useAppStore();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [primeShipping, setPrimeShipping] = useState(false);
  const [isCod, setIsCod] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const response: ProductType[] | undefined =
        await getMultipleProductDetails(
          cartProducts.map((product) => product.id)
        );
      if (response) {
        setProducts(response);
      } else {
        setProducts([]);
      }
    };
    getData();
  }, [cartProducts]);

  const handleCheckoutRedirect = () => {
    const data = {
      products: {
        connect: products.map((product) => {
          return { id: product.id };
        }),
      },

      user: {
        id: userInfo.id,
      },
      status: {
        paymentMode: isCod ? "cash-on-delivery" : "stripe",
      },
      paymentIntent: "",
      price: getTotalAmount() + (primeShipping ? 40 : 0),
    };
    setOrdersInfo(data);
    router.push("/checkout");
  };

  return (
    <div className="px-10 py-10 ">
      <h2 className="mb-10 text-3xl text-amazon-dark">
        <strong>Shopping Cart</strong>
      </h2>
      {cartProducts.length ? (
        <div className="flex gap-10">
          <div className="w-3/4">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                {products.map((product) => (
                  <Product key={product.id} productData={product} />
                ))}
              </div>
            </div>
            <div className="flex gap-1 mt-10 justify-between items-center">
              <div>
                <h4>
                  <strong>Choose Shipping</strong>
                </h4>
                <div className="flex  gap-5 mt-3">
                  <div className="flex">
                    <div className="flex items-center h-5">
                      <input
                        id="helper-radio"
                        aria-describedby="helper-radio-text"
                        type="radio"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        name="shipping-method"
                        onClick={() => setPrimeShipping(false)}
                        checked={!primeShipping}
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        htmlFor="helper-radio"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Free shipping
                      </label>
                      <p
                        id="helper-radio-text"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Expected delivery in 7 days
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex items-center h-5">
                      <input
                        id="helper-radio2"
                        aria-describedby="helper-radio-text"
                        type="radio"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        name="shipping-method"
                        onClick={() => setPrimeShipping(true)}
                        checked={primeShipping}
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        htmlFor="helper-radio2"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Prime Shipping ($40 Extra)
                      </label>
                      <p
                        id="helper-radio-text"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Expected delivery in 2 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <h4>Subtotal (1 item):</h4>
                <h4>
                  <strong>${getTotalAmount()}</strong>
                </h4>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 p-10 h-max">
            <h5>
              <strong>Kishan, the last step remains!</strong>
            </h5>
            <div className="flex flex-col gap-2 my-5">
              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    id="stripe"
                    aria-describedby="payment-method-text"
                    type="radio"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="payment-method"
                    onClick={() => setIsCod(false)}
                    checked={!isCod}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="stripe"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Stripe
                  </label>
                </div>
              </div>
              <div className="flex ">
                <div className="flex items-center h-5">
                  <input
                    id="cod"
                    aria-describedby="payment-method-text"
                    type="radio"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="payment-method"
                    onClick={() => setIsCod(true)}
                    checked={isCod}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="cod"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 my-5">
              <div className="flex gap-3 justify-between">
                <h4>Subtotal (1 item):</h4>
                <h4>
                  <strong>${getTotalAmount()}</strong>
                </h4>
              </div>
              <div className="flex gap-3 justify-between">
                <h4>Shipping ({primeShipping ? "Prime" : "Free"}):</h4>
                <h4 className="">
                  <strong>${primeShipping ? "40" : "0"}</strong>
                </h4>
              </div>
              <div className="flex gap-3 justify-between">
                <h4>Total:</h4>
                <h4 className="">
                  <strong>
                    ${getTotalAmount() + (primeShipping ? 40 : 0)}
                  </strong>
                </h4>
              </div>
            </div>
            {userInfo ? (
              <button
                className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex justify-between px-3 py-2 gap-10 font-bold w-full"
                onClick={() => handleCheckoutRedirect()}
              >
                <span>Checkout</span>

                <span> ${getTotalAmount() + (primeShipping ? 40 : 0)}</span>
              </button>
            ) : (
              <button
                className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex justify-center px-3 py-2 gap-10 font-bold w-full items-center"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6 justify-center h-[50vh] text-5xl bg-amazon-background font-bold">
          <CgDanger className="text-danger-400 text-[100px]" />
          <div>Cart is Empty</div>
        </div>
      )}
    </div>
  );
};

export default Page;
