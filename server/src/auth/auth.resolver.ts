import * as common from "@nestjs/common";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AuthService } from "./auth.service";
import { GqlDefaultAuthGuard } from "./gqlDefaultAuth.guard";
import { UserData } from "./userData.decorator";
import { LoginArgs, SignupArgs } from "./LoginArgs";
import { UserInfo } from "./UserInfo";
import { User } from "src/user/base/User";
import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
import { Request } from "express";

@Resolver(UserInfo)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => UserInfo)
  async login(@Args() args: LoginArgs): Promise<UserInfo> {
    return this.authService.login(args.credentials);
  }

  @Mutation(() => UserInfo)
  async signup(@Args() args: SignupArgs): Promise<UserInfo> {
    return this.authService.signup(args.credentials);
  }
  @Query(() => User)
  async me(@Context("req") request: Request): Promise<User> {
    return this.authService.me(request.headers.authorization);
  }

  @Query(() => UserInfo)
  @common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
  async userInfo(@UserData() entityInfo: UserInfo): Promise<UserInfo> {
    return entityInfo;
  }
}
