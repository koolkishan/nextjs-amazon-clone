import Image from "next/image";
import React, { useState } from "react";

const ImageSlider = () => {
  const images = [
    "/products/product1.png",
    "/products/product1.png",
    "/products/product1.png",
    "/products/product1.png",
    "/products/product1.png",
    "/products/product1.png",
    "/products/product1.png",
    "/products/product1.png",
  ];
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex gap-5">
      <ul className="flex flex-col gap-2">
        {images.map((image, index) => (
          <li
            className={`p-3 bg-gray-200 rounded-sm w-max cursor-pointer`}
            key={image}
            onClick={() => setSelected(index)}
          >
            <Image src={image} alt="product" height={25} width={25} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center w-full">
        <Image src={images[selected]} alt="product" height={300} width={300} />
      </div>
    </div>
  );
};

export default ImageSlider;
