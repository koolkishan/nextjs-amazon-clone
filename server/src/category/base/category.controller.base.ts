/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { CategoryService } from "../category.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { CategoryCreateInput } from "./CategoryCreateInput";
import { CategoryWhereInput } from "./CategoryWhereInput";
import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";
import { CategoryFindManyArgs } from "./CategoryFindManyArgs";
import { CategoryUpdateInput } from "./CategoryUpdateInput";
import { Category } from "./Category";
import { ProductFindManyArgs } from "../../product/base/ProductFindManyArgs";
import { Product } from "../../product/base/Product";
import { ProductWhereUniqueInput } from "../../product/base/ProductWhereUniqueInput";

export class CategoryControllerBase {
  constructor(
    protected readonly service: CategoryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Category })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "create",
    possession: "any",
  })
  @swagger.ApiBearerAuth()
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async create(@common.Body() data: CategoryCreateInput): Promise<Category> {
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Category] })
  @ApiNestedQuery(CategoryFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async findMany(@common.Req() request: Request): Promise<Category[]> {
    const args = plainToClass(CategoryFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
        _count: true,
      },
    });
  }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Category })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async findOne(
    @common.Param() params: CategoryWhereUniqueInput
  ): Promise<Category | null> {
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Category })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiBearerAuth()
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  async update(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() data: CategoryUpdateInput
  ): Promise<Category | null> {
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Category })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiBearerAuth()
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  async delete(
    @common.Param() params: CategoryWhereUniqueInput
  ): Promise<Category | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/products")
  @ApiNestedQuery(ProductFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Product",
    action: "read",
    possession: "any",
  })
  async findManyProducts(
    @common.Req() request: Request,
    @common.Param() params: CategoryWhereUniqueInput
  ): Promise<Product[]> {
    const query = plainToClass(ProductFindManyArgs, request.query);
    const results = await this.service.findProducts(params.id, {
      ...query,
      select: {
        category: {
          select: {
            id: true,
          },
        },

        colors: true,
        createdAt: true,
        description: true,
        discountPrice: true,
        id: true,
        images: true,

        order: {
          select: {
            id: true,
          },
        },

        salePrice: true,
        title: true,
        updatedAt: true,
        variants: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/products")
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  @swagger.ApiBearerAuth()
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  async connectProducts(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() body: ProductWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      products: {
        connect: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/products")
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  @swagger.ApiBearerAuth()
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  async updateProducts(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() body: ProductWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      products: {
        set: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/products")
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  @swagger.ApiBearerAuth()
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  async disconnectProducts(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() body: ProductWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      products: {
        disconnect: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
