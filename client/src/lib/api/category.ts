import { createUrl, get, post } from "./api-client";

export const addCategory = async (name: string) => {
  try {
    const response = await post(createUrl("/api/categories/"), { name });
    return response.status === 201 ? true : false;
  } catch (error) {
    console.log({ error });
  }
};

export const getAllCategories = async () => {
  try {
    const response = await get(createUrl("/api/categories/"));
    if (response.data) {
      return response.data;
    }
    console.log({ response });
  } catch (error) {
    console.log(error);
  }
};
