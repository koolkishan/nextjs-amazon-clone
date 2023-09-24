import { CategoryWhereInput } from "./CategoryWhereInput";
import { CategoryOrderByInput } from "./CategoryOrderByInput";

export type CategoryFindManyArgs = {
  where?: CategoryWhereInput;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: number;
  take?: number;
};
