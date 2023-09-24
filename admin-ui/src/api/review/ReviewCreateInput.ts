import { ProductWhereUniqueInput } from "../product/ProductWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewCreateInput = {
  description: string;
  product?: ProductWhereUniqueInput | null;
  rating: number;
  user?: UserWhereUniqueInput | null;
};
