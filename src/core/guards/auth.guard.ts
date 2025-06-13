import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>('skipAuth', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    request['user'] = await this.jwtService
      .verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      })
      .catch(() => {
        throw new UnauthorizedException();
      });
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    return bearer === 'Bearer' ? token : undefined;
  }
}
