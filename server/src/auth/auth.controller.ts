import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Credentials, SignupCredentials } from "./Credentials";
import { UserInfo } from "./UserInfo";
import { User } from "src/user/base/User";
import { Request } from "express";

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get("me")
  async me(@Req() request: Request): Promise<User> {
    return this.authService.me(request.headers.authorization);
  }
  @Post("login")
  async login(@Body() body: Credentials): Promise<UserInfo> {
    return this.authService.login(body);
  }
  @Post("signup")
  async signup(@Body() body: SignupCredentials): Promise<UserInfo> {
    return this.authService.signup(body);
  }
}
