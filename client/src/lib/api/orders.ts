import { AxiosError, AxiosResponse } from "axios";
import { createUrl, get, patch, post } from "./api-client";
import qs from "qs";

export const createOrder = async (orders: any) => {
  try {
    const response = await post(createUrl("/api/orders"), { ...orders });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await get(createUrl("/api/orders"));
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

export const getUserOrders = async (userId: string) => {
  try {
    const query = qs.stringify({
      where: {
        user: { id: userId },
      },
    });
    const response = await get(createUrl(`/api/orders?${query}`));
    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const response = await get(createUrl(`/api/orders/${orderId}`));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateOrderPaymentStatus = async (
  paymentStatus: boolean,
  orderId: string
): Promise<AxiosResponse | AxiosError> => {
  try {
    const response = await patch(createUrl(`/api/orders/${orderId}`), {
      paymentStatus,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
};
