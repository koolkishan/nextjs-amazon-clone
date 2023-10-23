import Image from "next/image";
import React, { useState } from "react";

const ImageSlider = ({ images }: { images: string[] }) => {
  const [selected, setSelected] = useState(images[0]);
  return (
    <div className="flex gap-5">
      <ul className="flex flex-col gap-2">
        {images.map((image) => (
          <li
            className={`p-2 bg-gray-200 rounded-sm w-max cursor-pointer`}
            key={image}
            onClick={() => setSelected(image)}
          >
            <div className="relative h-10 w-16">
              <Image src={image} alt="product" fill />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center w-full">
        <div className="h-[500px] w-full relative">
          <Image src={selected} alt="product" fill />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
