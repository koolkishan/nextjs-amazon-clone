import qs from "qs";
import { createUrl, get } from "./api-client";

export const getSearchResults = async (searchTerm: string) => {
  try {
    const query = qs.stringify({
      where: {
        title: { contains: searchTerm },
      },
    });
    const response = await get(createUrl(`/api/products?${query}`));
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
