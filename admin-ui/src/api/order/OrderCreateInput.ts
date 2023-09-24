import { ProductCreateNestedManyWithoutOrdersInput } from "./ProductCreateNestedManyWithoutOrdersInput";
import { InputJsonValue } from "../../types";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrderCreateInput = {
  paymentIntent: string;
  paymentStatus?: boolean | null;
  price: number;
  products?: ProductCreateNestedManyWithoutOrdersInput;
  status: InputJsonValue;
  user?: UserWhereUniqueInput | null;
};
