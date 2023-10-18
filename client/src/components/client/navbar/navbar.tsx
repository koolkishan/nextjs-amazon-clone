import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    router.push(`/search?query=${searchTerm}`);
  };
  const { cartProducts, userInfo } = useAppStore();
  const router = useRouter();
  return (
    <nav className="bg-amazon-dark min-h-[12vh] flex items-center px-10 h-full text-white gap-10">
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="h-12 w-14 bg-amazon-primary rounded-r-sm outline-none border-none text-2xl flex items-center justify-center hover:bg-amazon-secondary transition-all duration-300"
          onClick={handleSearch}
        >
          <FiSearch />
        </button>
      </div>
      {!userInfo ? (
        <div className="flex flex-col gap-0  justify-around cursor-pointer">
          <span className="font-semibold" onClick={() => router.push("/login")}>
            Login
          </span>
        </div>
      ) : (
        <Popover placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <div className="flex items-end gap-1 cursor-pointer">
              <div className="flex flex-col gap-0  justify-around">
                <span className="text-sm h-4 capitalize">
                  Hello, {userInfo?.username.split("@")[0]}
                </span>
                <span className="font-semibold">Account & Orders</span>
              </div>
              <div className="text-xl">
                <BiChevronDown />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="w-full max-w-[260px]">
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => router.push(key as string)}
                >
                  <ListboxItem key="/my-orders">My Orders</ListboxItem>
                  <ListboxItem
                    key="/logout"
                    className="text-danger"
                    color="danger"
                  >
                    Logout
                  </ListboxItem>
                </Listbox>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
      <div className="cursor-pointer" onClick={() => router.push("/cart")}>
        <div className="flex items-end relative">
          <Image src="/cart.png" alt="cart" height={40} width={40} />
          <span className="font-medium">Cart</span>
          <span className="absolute bottom-4 left-[15px] w-4 text-xs text-amazon-secondary font-medium flex items-center justify-center ">
            {cartProducts.length}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
