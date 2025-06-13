import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { authSwaggerSchema } from './auth.swagger-schema';
import { SkipAuth } from './decorators/skipauth.decorator';
import { CreateUserDto } from '../user/user.service';

export type LoginBody = {
  username: string;
  password: string;
};

@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody(authSwaggerSchema.loginBody)
  login(@Body() loginBody: LoginBody) {
    return this.authService.login(loginBody);
  }

  @Post('register')
  @ApiBody(authSwaggerSchema.registerBody)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
