"use client";
import React, { useEffect, useState } from "react";
import { ImageSlider } from "./components/image-slider";
import { TrustSlider } from "./components/trust-slider";
import { Colors } from "./components/colors";
import { Variants } from "./components/variants";

import { Ratings } from "@/app/search/components/product/ratings";
import { FaCaretDown } from "react-icons/fa";
import { PaymentInfo } from "./components/payment-info";
import { getProductDetails } from "@/lib/api/products";
import { ProductType } from "@/utils/types";

const Page = ({ params: { productId } }: { params: { productId: string } }) => {
  const [productDetails, setProductDetails] = useState<ProductType | undefined>(
    undefined
  );
  useEffect(() => {
    const getData = async () => {
      const response: ProductType = await getProductDetails(productId);
      setProductDetails(response);
    };
    getData();
  }, [productId]);

  return (
    <div className="mt-5 mx-10">
      {productDetails && (
        <>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "50% 25% 25%" }}
          >
            <div>
              <ImageSlider images={productDetails.images} />
            </div>
            <div>
              <div>
                <h4 className="font-semibold text-2xl">
                  {productDetails.title}
                </h4>
                <div className="flex items-center gap-2">
                  <Ratings />
                  <span className="text-amazon-blue underline text-sm">
                    {/* {productDetails.ratings.count} */}
                  </span>
                </div>
                <div className="border-t border-t-gray-300 border-b border-b-gray-300 py-2 my-2">
                  <div className="flex  gap-2 mt-2 flex-col">
                    <div className="flex gap-2 items-center">
                      <div className="text-2xl font-semibold">
                        ${productDetails.discountPrice}
                      </div>
                      <div className="text-gray-600 font-medium">
                        List Price:
                        <span className="line-through">
                          {" "}
                          ${productDetails.salePrice}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-sm">Inclusive of all taxes</h6>
                      <div className="flex gap-3 items-center">
                        <h6 className="text-sm">No Cost EMI available</h6>
                        <h6 className="text-xs text-amazon-blue underline flex items-center cursor-pointer">
                          EMI Options
                          <FaCaretDown />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <TrustSlider />
              <Colors colors={productDetails.colors} />
              <Variants variants={productDetails.variants} />
              <div className="mt-3">
                <h5 className="text-sm font-semibold">About this item</h5>
                <ul className="text-sm flex flex-col gap-1 list-disc pl-3">
                  {productDetails.description.map((stat) => (
                    <li key={stat}>{stat}</li>
                  ))}
                </ul>
              </div>
            </div>
            <PaymentInfo
              data={{
                price: productDetails.discountPrice,
                originalPrice: productDetails.salePrice,
                id: productDetails.id,
              }}
            />
          </div>
          <div>
            {/* <ReviewBars /> */}
            {/* <Reviews /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
