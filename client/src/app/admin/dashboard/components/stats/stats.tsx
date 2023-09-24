import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Stats = ({ title, data }: { title: string; data: number }) => {
  return (
    <div>
      <Card className="w-64 min-h-[100px]">
        <CardHeader className="justify-between text-xl font-semibold">
          {title}
        </CardHeader>
        <CardBody className="px-3 py-0 text-3xl  font-bold text-amazon-primary ">
          {data}
        </CardBody>
      </Card>
    </div>
  );
};

export default Stats;
