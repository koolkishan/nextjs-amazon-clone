import { createUrl, post } from "./api-client";

export const addProduct = async (data: any) => {
  try {
    const response = await post(createUrl("/api/products/"), { ...data });
    console.log({ response });
    return response.status === 201 ? true : false;
  } catch (error) {
    console.log({ error });
  }
};
