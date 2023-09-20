import React from "react";
import { FaStar } from "react-icons/fa";

const Ratings = () => {
  return (
    <div className="flex gap-1 items-center ">
      <span className="font-medium">5</span>
      <div className="text-yellow-400 flex">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </div>
  );
};

export default Ratings;
