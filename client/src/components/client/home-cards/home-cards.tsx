import Image from "next/image";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

const HomeCards = () => {
  return (
    <div className="h-[20vh] bg-orange-500 flex items-center justify-between px-40 text-white">
      <div className="text-4xl capitalize ">gift cards</div>
      <div className="">
        <h3 className="text-3xl">Let them choose the perfect gift</h3>
        <div className="flex items-center gap-2 cursor-pointer">
          <span>Shop now</span>
          <FaCaretRight />
        </div>
      </div>
      <div className="relative">
        {/* <div className=" "> */}
        <div className=" absolute h-32 w-28 bg-white top-3 right-5 z-10"></div>
        <Image
          src="/home/gift-card.png"
          alt="gift card"
          height={300}
          width={300}
          className=" relative z-20"
        />

        {/* </div> */}
      </div>
    </div>
  );
};

export default HomeCards;
