import { createUrl, post, get, axiosDelete } from "./api-client";

export const addProduct = async (data: any) => {
  try {
    const response = await post(createUrl("/api/products/"), { ...data });
    console.log({ response });
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
    console.log({ response });
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
      console.log({ data });
      productDetails.push(data);
    }
    console.log({ productDetails });
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

export const editProduct = async (id: string, data: any) => {
  try {
  } catch (error) {
    console.log({ error });
  }
};
