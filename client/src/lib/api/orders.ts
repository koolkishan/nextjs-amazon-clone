import { createUrl, get, patch, post } from "./api-client";
import qs from "qs";

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

export const recordStripePayment = async (paymnent_intent: string) => {
  try {
    const query = qs.stringify({
      where: {
        paymentIntent: paymnent_intent,
      },
    });
    const response = await get(createUrl(`/api/orders?${query}`));
    console.log({ response });
    if (response.data.length) {
      const updateResponse = await patch(
        createUrl(`/api/orders/${response.data[0].id}`),
        { paymentStatus: true }
      );
      return updateResponse;
    }
  } catch (error) {
    return error;
  }
};
