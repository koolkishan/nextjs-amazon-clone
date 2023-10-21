import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { JsonFilter } from "../../util/JsonFilter";
import { FloatFilter } from "../../util/FloatFilter";
import { StringFilter } from "../../util/StringFilter";
import { OrderListRelationFilter } from "../order/OrderListRelationFilter";
import { ReviewListRelationFilter } from "../review/ReviewListRelationFilter";

export type ProductWhereInput = {
  category?: CategoryWhereUniqueInput;
  colors?: JsonFilter;
  description?: JsonFilter;
  discountPrice?: FloatFilter;
  id?: StringFilter;
  images?: JsonFilter;
  order?: OrderListRelationFilter;
  reviews?: ReviewListRelationFilter;
  salePrice?: FloatFilter;
  title?: StringFilter;
  variants?: JsonFilter;
};
