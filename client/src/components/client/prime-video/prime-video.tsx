import Image from "next/image";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

const PrimeVideo = () => {
  return (
    <div className="bg-amazon-dark h-[50vh] grid grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center flex-col gap-3">
        <span className="text-white tracking-[10px]">AMAZON EXCLUSIVE</span>
        <h1 className="text-6xl text-white letter tracking-widest">FARZI</h1>
        <div className="flex gap-2 text-amazon-blue font-semibold">
          <span>Watch now</span>
          <FaCaretRight />
        </div>
        <div className="text-amazon-blue font-semibold">
          Get Amazon Prime Video for just $20
        </div>
      </div>
      <div className="relative h-full w-[800px]">
        <Image src="/home/farzi.jpg" fill alt="prime" />
      </div>
    </div>
  );
};

export default PrimeVideo;
