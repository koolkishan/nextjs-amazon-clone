import { Ratings } from "@/app/search/components/product/ratings";
import { ProductType } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductGrid = ({
  products,
  title,
}: {
  products: ProductType[];
  title: string;
}) => {
  const router = useRouter();
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
    <div className="mx-20 flex flex-col gap-6">
      <div className="flex justify-between ">
        <h4 className="font-semibold">{title}</h4>
        <h4 className="text-amazon-primary">View all</h4>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <div className="flex flex-col items-start">
              <div className="flex justify-center mb-2 relative h-40 w-64">
                <Image src={product.images[0]} fill alt="product" />
              </div>

              <h3>{product.title}</h3>
              <div className="flex items-center gap-2">
                <Ratings />
                {/* <span className="text-amazon-blue underline text-sm">
                  {product.ratings.count}
                </span> */}
              </div>
              <div className="font-medium">
                <span>$</span>
                <span>{product.discountPrice}</span>
              </div>

              <div className="text-sm">
                Get it by {getRandomDateInNext7Days()}
              </div>
              <div className="text-green-500 font-semibold">In stock</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
