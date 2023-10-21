import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { OrderUpdateManyWithoutProductsInput } from "./OrderUpdateManyWithoutProductsInput";
import { ReviewUpdateManyWithoutProductsInput } from "./ReviewUpdateManyWithoutProductsInput";

export type ProductUpdateInput = {
  category?: CategoryWhereUniqueInput;
  colors?: InputJsonValue;
  description?: InputJsonValue;
  discountPrice?: number;
  images?: InputJsonValue;
  order?: OrderUpdateManyWithoutProductsInput;
  reviews?: ReviewUpdateManyWithoutProductsInput;
  salePrice?: number;
  title?: string;
  variants?: InputJsonValue;
};
