import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticate(@Body() signInDto: SignInDto) {
    return await this.authService.authenticate(signInDto);
  }
}
