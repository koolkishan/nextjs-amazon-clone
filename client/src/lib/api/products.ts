import { AxiosError, AxiosResponse } from "axios";
import { createUrl, post, get, axiosDelete, patch } from "./api-client";

export const addProduct = async (data: any) => {
  try {
    const response = await post(createUrl("/api/products/"), { ...data });
    return response.status === 201 ? true : false;
  } catch (error) {
    console.log({ error });
  }
};

export const updateProduct = async (data: any, id: string) => {
  try {
    const response = await patch(createUrl(`/api/products/${id}`), { data });
    return response.status === 201 ? true : false;
  } catch (error) {
    console.log({ error });
  }
};

export const getAllProducts = async () => {
  try {
    const response = await get(createUrl("/api/products/"));
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const response = await get(createUrl(`/api/products/${productId}`));
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getMultipleProductDetails = async (productIds: string[]) => {
  try {
    const productDetails = [];
    for (let i = 0; i < productIds.length; i++) {
      const data = await getProductDetails(productIds[i]);

      productDetails.push(data);
    }

    return productDetails;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosDelete(createUrl(`/api/products/${id}`));
    if (response.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const editProduct = async (
  id: string,
  data: any
): Promise<AxiosResponse | AxiosError> => {
  try {
    console.log({ data });
    const response = await patch(createUrl(`/api/products/${id}`), { ...data });
    return response;
  } catch (error) {
    return error as AxiosError;
  }
};
