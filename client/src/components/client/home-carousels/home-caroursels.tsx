import Image from "next/image";
import React from "react";

const HomeCarousels = () => {
  return (
    <div className="h-[50vh] bg-red-100">
      <div className="relative h-full w-full bg-cover">
        <Image fill alt="home" src="/home/home.jpg" />
      </div>
    </div>
  );
};

export default HomeCarousels;
