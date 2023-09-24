import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CategoryService } from "./category.service";
import { CategoryControllerBase } from "./base/category.controller.base";

@swagger.ApiTags("categories")
@common.Controller("categories")
export class CategoryController extends CategoryControllerBase {
  constructor(
    protected readonly service: CategoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
