import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React from "react";

// Product Title
// Product Descriptions
// Product Sale Price
// Product Discounted Price
// Product Colors
// Product Variants
// Product Images

const Page = () => {
  return (
    <div className="m-10">
      <Card className="p-5">
        <CardHeader>
          <h2 className="text-3xl">Add Product</h2>
        </CardHeader>
        <CardBody>
          <Input type="text" label="Product Name" variant="bordered" />
          <Input type="text" label="Product Description" variant="bordered" />

          <Input type="number" label="Sale Price" variant="bordered" />
          <Input type="number" label="Discounted Price" variant="bordered" />
          {/* <Input ty/pe="color" variant="bordered" /> */}
          <Input type="text" label="Variant" variant="bordered" />
          <input type="color" />
        </CardBody>
        <CardFooter>
          <Button color="primary" size="lg">
            Add Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
