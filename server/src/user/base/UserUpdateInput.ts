/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { OrderUpdateManyWithoutUsersInput } from "./OrderUpdateManyWithoutUsersInput";
import { Type } from "class-transformer";
import { ReviewUpdateManyWithoutUsersInput } from "./ReviewUpdateManyWithoutUsersInput";
import { IsJSONValue } from "@app/custom-validators";
import { GraphQLJSON } from "graphql-type-json";
import { InputJsonValue } from "../../types";

@InputType()
class UserUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName?: string | null;

  @ApiProperty({
    required: false,
    type: () => OrderUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => OrderUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => OrderUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  orders?: OrderUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  password?: string;

  @ApiProperty({
    required: false,
    type: () => ReviewUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => ReviewUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => ReviewUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  reviews?: ReviewUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
  })
  @IsJSONValue()
  @IsOptional()
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  roles?: InputJsonValue;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  username?: string;
}

export { UserUpdateInput as UserUpdateInput };
