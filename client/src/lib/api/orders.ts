import { createUrl, get, post } from "./api-client";

export const createOrder = async (orders: any) => {
  try {
    const response = await post(createUrl("/api/orders"), { ...orders });
    return response.data;
    console.log({ response });
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await get(createUrl("/api/orders"));
    console.log({ response });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
