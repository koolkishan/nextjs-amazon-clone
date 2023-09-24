import { StringFilter } from "../../util/StringFilter";
import { ProductWhereUniqueInput } from "../product/ProductWhereUniqueInput";
import { IntFilter } from "../../util/IntFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewWhereInput = {
  description?: StringFilter;
  id?: StringFilter;
  product?: ProductWhereUniqueInput;
  rating?: IntFilter;
  user?: UserWhereUniqueInput;
};
