import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/user.service';
import { LoginBody } from './auth.controller';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginBody: LoginBody): Promise<{
    access_token: string;
    user: {
      id: number;
      username: string;
    };
  }> {
    if (!loginBody.username || !loginBody.password) {
      throw new UnauthorizedException('Username and password are required');
    }

    const user = await this.userService.findOneByAttribute(
      'username',
      loginBody.username,
    );

    if (!user || !(await bcrypt.compare(loginBody.password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByAttribute(
      'username',
      createUserDto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userService.createUser(createUserDto);
  }
}
