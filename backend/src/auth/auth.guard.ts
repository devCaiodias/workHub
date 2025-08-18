import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authorization = this.extractTokenFromHeader(request)

    if (!authorization) {
      throw new UnauthorizedException('Token is required.')
    }

    try {
      const payload = this.jwtService.verify(authorization, {
        secret: process.env.SECRET_KEY
      })
      request['sub'] = payload
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
  const authHeader = request.headers['authorization'];
  if (!authHeader) return undefined;

  const [type, token] = authHeader.split(' ');
  if (type?.toLowerCase() !== 'bearer') return undefined;

  return token;
}
}
