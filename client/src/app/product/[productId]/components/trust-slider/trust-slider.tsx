import Image from "next/image";
import React from "react";

const TrustSlider = () => {
  const images = [
    {
      name: "Amazon Delivered",
      image: "/trust/trust1.png",
    },
    {
      name: "Top Brand",
      image: "/trust/trust2.png",
    },
    {
      name: "Warranty Policy",
      image: "/trust/trust3.png",
    },
    {
      name: "Free Delivery",
      image: "/trust/trust4.png",
    },
    {
      name: "7 days Replacement",
      image: "/trust/trust5.png",
    },
  ];
  return (
    <div className="flex gap-2 items-center justify-center my-4">
      {images.map((image) => (
        <div
          key={image.name}
          className="flex flex-col items-center justify-center"
        >
          <Image alt="trust" height={25} width={25} src={image.image} />
          <span className=" text-xs text-center">{image.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustSlider;
