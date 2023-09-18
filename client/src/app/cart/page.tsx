import React from "react";
import { Product } from "./components/product";

const Page = () => {
  const cartData = [
    {
      id: 1,
      title: "Apple Iphone 15 Pro",
      color: "titanium",
      quantity: "1",
      price: "$150.99",
      image: "/products/product1.png",
    },
    {
      id: 1,
      title: "Apple Iphone 15 Pro",
      color: "titanium",
      quantity: "1",
      price: "$150.99",
      image: "/products/product1.png",
    },
  ];
  return (
    <div className="px-10 py-10 ">
      <h2 className="mb-10 text-3xl text-amazon-dark">
        <strong>Shopping Cart</strong>
      </h2>
      <div className="flex gap-10">
        <div className="w-3/4">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              {cartData.map((product) => (
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
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      for="helper-radio"
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
                      id="helper-radio"
                      aria-describedby="helper-radio-text"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      name="shipping-method"
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      for="helper-radio"
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
                <strong>$1500</strong>
              </h4>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 p-10 h-max">
          <h5>
            <strong>Kishan, the last step remains!</strong>
          </h5>
          <div className="flex flex-col gap-2 my-5">
            <div className="flex ">
              <div className="flex items-center h-5">
                <input
                  id="payment-method"
                  aria-describedby="payment-method-text"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  name="shipping-method"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  for="payment-method"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Cash on Delivery
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  id="payment-method"
                  aria-describedby="payment-method-text"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  name="shipping-method"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  for="payment-method"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Stripe
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 my-5">
            <div className="flex gap-3 justify-between">
              <h4>Subtotal (1 item):</h4>
              <h4>
                <strong>$1500</strong>
              </h4>
            </div>
            <div className="flex gap-3 justify-between">
              <h4>Shipping (Free):</h4>
              <h4 className="">
                <strong>$0</strong>
              </h4>
            </div>
            <div className="flex gap-3 justify-between">
              <h4>Total:</h4>
              <h4 className="">
                <strong>$1500</strong>
              </h4>
            </div>
          </div>
          <button className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex justify-between px-3 py-2 gap-10 font-bold w-full">
            <span>Checkout</span>

            <span> $1500</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
