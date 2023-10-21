import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { OrderCreateNestedManyWithoutProductsInput } from "./OrderCreateNestedManyWithoutProductsInput";
import { ReviewCreateNestedManyWithoutProductsInput } from "./ReviewCreateNestedManyWithoutProductsInput";

export type ProductCreateInput = {
  category: CategoryWhereUniqueInput;
  colors: InputJsonValue;
  description: InputJsonValue;
  discountPrice: number;
  images: InputJsonValue;
  order?: OrderCreateNestedManyWithoutProductsInput;
  reviews?: ReviewCreateNestedManyWithoutProductsInput;
  salePrice: number;
  title: string;
  variants: InputJsonValue;
};
