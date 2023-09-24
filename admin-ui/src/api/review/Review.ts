import { Product } from "../product/Product";
import { User } from "../user/User";

export type Review = {
  createdAt: Date;
  description: string;
  id: string;
  product?: Product | null;
  rating: number;
  updatedAt: Date;
  user?: User | null;
};
