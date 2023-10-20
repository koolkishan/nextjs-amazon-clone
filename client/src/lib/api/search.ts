import qs from "qs";
import { createUrl, get } from "./api-client";

export const getSearchResults = async (
  searchTerm: string,
  category: string
) => {
  try {
    let query;
    if (searchTerm && searchTerm.length > 0) {
      query = qs.stringify({
        where: {
          title: { contains: searchTerm },
        },
      });
    } else if (category && category.length > 0) {
      query = qs.stringify({
        where: {
          category: { id: category },
        },
      });
    }

    const response = await get(createUrl(`/api/products?${query}`));
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
