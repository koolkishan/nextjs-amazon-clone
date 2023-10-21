import React from "react";

const Page = ({ params: { orderId } }: { params: { orderId: string } }) => {
  return <div>{orderId}</div>;
};

export default Page;
