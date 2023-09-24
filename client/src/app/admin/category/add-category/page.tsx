"use client";
import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/lib/api/category";

export default function Page() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const handleClick = async () => {
    const result = await addCategory(category);
    if (result) {
      router.push("/admin/category/all-category");
    }
  };

  return (
    <div className="flex items-start justify-start m-10 h-full">
      <Card className="w-[50%] h-[35%] p-5">
        <CardHeader className="justify-between text-4xl">
          Add Category
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400 flex flex-col gap-10">
          <div className="flex w-[50%] pt-5">
            <Input
              type="email"
              label="Category Name"
              variant="bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-48 text-white bg-orange-400 hover:bg-amazon-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleClick}
          >
            Add Category
          </button>
        </CardBody>
        <CardFooter className="gap-3"></CardFooter>
      </Card>
    </div>
  );
}
