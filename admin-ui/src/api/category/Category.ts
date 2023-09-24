import { Product } from "../product/Product";

export type Category = {
  createdAt: Date;
  id: string;
  name: string;
  products?: Array<Product>;
  updatedAt: Date;
};
