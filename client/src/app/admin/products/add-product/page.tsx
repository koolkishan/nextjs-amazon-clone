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
import { ImageSlider } from "@/app/product/[productId]/components/image-slider";
import { Colors } from "@/app/product/[productId]/components/colors";
import { Variants } from "@/app/product/[productId]/components/variants";
import { PaymentInfo } from "@/app/product/[productId]/components/payment-info";
import { Ratings } from "@/app/search/components/product/ratings";
import { FaCaretDown } from "react-icons/fa";

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
    <div>
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
                // @ts-ignore
                onSelectionChange={setCategory}
                // @ts-ignore
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
                // @ts-ignore
                onUpload={handleUpload}
                uploadPreset="bpqe55hm"
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
      <div className="m-10">
        <Card className="p-5">
          <CardHeader>
            <h2 className="text-3xl">Preview</h2>
          </CardHeader>
          <CardBody>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "50% 25% 25%" }}
            >
              <div>
                <ImageSlider images={photos} />
              </div>
              <div>
                <div>
                  <h4 className="font-semibold text-2xl">{name}</h4>
                  <div className="flex items-center gap-2">
                    <Ratings />
                    <span className="text-amazon-blue underline text-sm">
                      {/* {productDetails.ratings.count} */}
                    </span>
                  </div>
                  <div className="border-t border-t-gray-300 border-b border-b-gray-300 py-2 my-2">
                    <div className="flex  gap-2 mt-2 flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="text-2xl font-semibold">
                          ${discountedPrice}
                        </div>
                        <div className="text-gray-600 font-medium">
                          List Price:
                          <span className="line-through"> ${salePrice}</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="text-sm">Inclusive of all taxes</h6>
                        <div className="flex gap-3 items-center">
                          <h6 className="text-sm">No Cost EMI available</h6>
                          <h6 className="text-xs text-amazon-blue underline flex items-center cursor-pointer">
                            EMI Options
                            <FaCaretDown />
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Colors colors={colors} />
                <Variants variants={variants} />
                <div className="mt-3">
                  <h5 className="text-sm font-semibold">About this item</h5>
                  <ul className="text-sm flex flex-col gap-1 list-disc pl-3">
                    {descriptions.map((stat) => (
                      <li key={stat}>{stat}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <PaymentInfo
                data={{
                  price: +discountedPrice,
                  originalPrice: +salePrice,
                  id: "123",
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Page;
