"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CldUploadButton } from "next-cloudinary";
import { getAllCategories } from "@/lib/api/category";
import { addProduct } from "@/lib/api/products";
import { useRouter } from "next/navigation";

interface ProductData {
  category: {
    id: string;
  };
  colors: string[];
  description: string[];
  discountPrice: number;
  images: string[];
  salePrice: number;
  title: string;
  variants: string[];
}

interface Category {
  label: string;
  value: string;
}

const Page = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [salePrice, setSalePrice] = useState<string>("0");
  const [discountedPrice, setDiscountedPrice] = useState<string>("0");
  const [variants, setVariants] = useState<string[]>([]);
  const [variant, setVariant] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<Set<string>>(new Set());

  const addDescription = () => {
    setDescriptions([...descriptions, description]);
    setDescription("");
  };

  const addVariants = () => {
    setVariants([...variants, variant]);
    setVariant("");
  };

  const addColors = () => {
    setColors([...colors, color]);
    setColor("");
  };

  const handleUpload = (data: { info: { secure_url: string } }) => {
    setPhotos([...photos, data.info.secure_url]);
  };

  const handleAddProduct = async () => {
    const data: ProductData = {
      category: {
        id: Array.from(category)[0],
      },
      colors,
      description: descriptions,
      discountPrice: parseInt(discountedPrice),
      images: photos,
      salePrice: parseInt(salePrice),
      title: name,
      variants,
    };

    console.log({ data });

    const result = await addProduct(data);
    if (result) {
      router.push("/admin/products/all-products");
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const getData = async () => {
      const results = await getAllCategories();
      if (results) {
        const computedData: Category[] = results.map(
          ({ name, id }: { name: string; id: string }) => ({
            label: name,
            value: id,
          })
        );
        setCategories(computedData);
      }
    };
    getData();
  }, []);

  return (
    <div className="m-10">
      <Card className="p-5">
        <CardHeader>
          <h2 className="text-3xl">Add Product</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-10">
            <Input
              type="text"
              label="Product Name"
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              placeholder="Enter a product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-5 items-center">
              <Input
                type="text"
                label="Product Description"
                variant="bordered"
                labelPlacement="outside"
                size="lg"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                size="lg"
                className="mt-6"
                variant="ghost"
                color="primary"
                onClick={addDescription}
              >
                Add
              </Button>
            </div>
            <Input
              type="number"
              label="Sale Price"
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              placeholder="Enter sale price"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
            <Input
              type="number"
              label="Discounted Price"
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              placeholder="Enter discounted price"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
            />
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <Input
                  type="text"
                  label="Variant"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Enter product variant"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                />
                <Button
                  size="lg"
                  className="mt-6"
                  variant="ghost"
                  color="primary"
                  onClick={addVariants}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <Input
                  type="color"
                  label="Add Colors"
                  variant="bordered"
                  size="lg"
                  placeholder="Select color"
                  labelPlacement="outside"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Button
                  size="lg"
                  className="mt-6"
                  variant="ghost"
                  color="primary"
                  onClick={addColors}
                >
                  Add
                </Button>
              </div>
            </div>
            <Select
              label="Select a category"
              className="max-w-xs"
              labelPlacement="outside"
              size="lg"
              placeholder="Select Category"
              onSelectionChange={setCategory}
              value={category}
            >
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>
            <CldUploadButton
              options={{ multiple: true }}
              onUpload={handleUpload}
              uploadPreset="kmsiloa7"
            >
              <span className="bg-amazon-primary py-3 mt-6  px-5 text-white text-base font-medium rounded-md cursor-pointer">
                Upload Images
              </span>
            </CldUploadButton>
          </div>
        </CardBody>
        <CardFooter>
          <Button color="primary" size="lg" onClick={handleAddProduct}>
            Add Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
