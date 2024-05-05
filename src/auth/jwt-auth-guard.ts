import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Request } from 'express';
import { User } from './user.entity'; // Assuming User entity is imported

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = this.getUserFromToken(token); // Extract user information from token
      request['user'] = user;
      /*console.log('Decoded JWT payload:', user); */// Assign user object to request.user
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getUserFromToken(token: string): User {
    const payload = this.jwtService.verify(token, {
      secret: jwtConstants.secret
    });
    return payload as User; // Assuming User entity is used in payload
  }
}
