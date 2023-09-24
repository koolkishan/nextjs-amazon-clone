import { Product as TProduct } from "../api/product/Product";

export const PRODUCT_TITLE_FIELD = "title";

export const ProductTitle = (record: TProduct): string => {
  return record.title?.toString() || String(record.id);
};
