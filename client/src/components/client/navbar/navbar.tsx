import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
const Navbar = () => {
  return (
    <div className="bg-amazon-dark min-h-[12vh] flex items-center px-10 h-full text-white gap-10">
      <Link
        href="/"
        className="text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <Image
          src="/amazon-logo-white.png"
          alt="amazon logo"
          height={100}
          width={100}
        />
      </Link>
      <div className="flex items-end gap-1 cursor-pointer">
        <div className="flex flex-col gap-0  justify-around">
          <span className="text-sm h-4">Select</span>
          <span className="font-semibold">Category</span>
        </div>
        <div className="text-xl">
          <BiChevronDown />
        </div>
      </div>
      <div className="flex-1 flex ">
        <input
          type="text"
          className="w-full rounded-l-sm h-12 outline-none border-none pl-5 text-black"
          placeholder="Search Products"
        />
        <button className="h-12 w-14 bg-amazon-primary rounded-r-sm outline-none border-none text-2xl flex items-center justify-center hover:bg-amazon-secondary transition-all duration-300">
          <FiSearch />
        </button>
      </div>
      <div className="flex items-end gap-1 cursor-pointer">
        <div className="flex flex-col gap-0  justify-around">
          <span className="text-sm h-4">Hello, Kishan</span>
          <span className="font-semibold">Account & Orders</span>
        </div>
        <div className="text-xl">
          <BiChevronDown />
        </div>
      </div>
      <div className="cursor-pointer">
        <div className="flex items-end relative">
          <Image src="/cart.png" alt="cart" height={40} width={40} />
          <span className="font-medium">Cart</span>
          <span className="absolute bottom-4 left-[15px] w-4 text-xs text-amazon-secondary font-medium flex items-center justify-center ">
            2
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
