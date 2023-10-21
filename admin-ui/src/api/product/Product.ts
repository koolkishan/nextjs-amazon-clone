import { Category } from "../category/Category";
import { JsonValue } from "type-fest";
import { Order } from "../order/Order";
import { Review } from "../review/Review";

export type Product = {
  category?: Category;
  colors: JsonValue;
  createdAt: Date;
  description: JsonValue;
  discountPrice: number;
  id: string;
  images: JsonValue;
  order?: Array<Order>;
  reviews?: Array<Review>;
  salePrice: number;
  title: string;
  updatedAt: Date;
  variants: JsonValue;
};
