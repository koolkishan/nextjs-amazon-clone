import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { getAllCategories } from "@/lib/api/category";

type CategoryType = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  _count: {
    products: number;
  };
};

const Navbar = () => {
  const { cartProducts, userInfo } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesPopover, setcategoriesPopover] = useState(false);
  const [detailsPopover, setDetailsPopover] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response: CategoryType[] = await getAllCategories();

      const computedCategory: CategoryType[] = [];
      response.forEach((category) => {
        if (category._count.products > 0) {
          computedCategory.push(category);
        }
      });
      setCategories(computedCategory);
    };
    getData();
  }, []);

  const handleSearch = () => {
    router.push(`/search?query=${searchTerm}`);
  };
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
      <Popover
        placement="bottom"
        showArrow={true}
        isOpen={categoriesPopover}
        onOpenChange={(open) => setcategoriesPopover(open)}
        backdrop="blur"
      >
        <PopoverTrigger>
          <div className="flex items-end gap-1 cursor-pointer">
            <div className="flex flex-col gap-0  justify-around">
              <span className="text-sm h-4 capitalize">Select</span>
              <span className="font-semibold">Category</span>
            </div>
            <div className="text-xl">
              <BiChevronDown />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="w-full max-w-[660px]">
              <Listbox
                aria-label="Actions"
                onAction={(key) => {
                  router.push(`/search?category=${key}`);
                  setcategoriesPopover(false);
                }}
                className="grid grid-cols-3"
              >
                {categories.map((category) => (
                  <ListboxItem key={category.id}>{category.name}</ListboxItem>
                ))}
              </Listbox>
            </div>
          </div>
        </PopoverContent>
      </Popover>
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
        <Popover
          placement="bottom"
          showArrow={true}
          isOpen={detailsPopover}
          onOpenChange={(open) => setDetailsPopover(open)}
          backdrop="blur"
        >
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
                  onAction={(key) => {
                    router.push(key as string);
                    setDetailsPopover(false);
                  }}
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
