import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";
import { CategoryUpdateInput } from "./CategoryUpdateInput";

export type UpdateCategoryArgs = {
  where: CategoryWhereUniqueInput;
  data: CategoryUpdateInput;
};
