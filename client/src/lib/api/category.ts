import { AxiosError, AxiosResponse } from "axios";
import { axiosDelete, createUrl, get, patch, post } from "./api-client";

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
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await get(createUrl(`/api/categories/${id}`));
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const editCategory = async (
  id: string,
  category: string
): Promise<AxiosResponse | AxiosError> => {
  try {
    const response = await patch(createUrl(`/api/categories/${id}`), {
      name: category,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
};

export const deleteCategory = async (
  id: string
): Promise<AxiosResponse | AxiosError> => {
  try {
    const response: AxiosResponse = await axiosDelete(
      createUrl(`/api/categories/${id}`)
    );
    return response;
  } catch (error) {
    return error as AxiosError;
  }
};
