import { SortOrder } from "../../util/SortOrder";

export type ProductOrderByInput = {
  categoryId?: SortOrder;
  colors?: SortOrder;
  createdAt?: SortOrder;
  description?: SortOrder;
  discountPrice?: SortOrder;
  id?: SortOrder;
  images?: SortOrder;
  salePrice?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
  variants?: SortOrder;
};
