import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from './user.entity';

@Injectable()
export class RolesGuard implements CanActivate  {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) {
      return true; // No role required, access granted
    }

    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    const user: User = request.user;

    if (!user || !user.userrole || !Array.isArray(user.userrole)) {
      console.error('User or user role is not properly defined.');
      return false; // Deny access
    }

    const userRoles = user.userrole.map(role => role.toLowerCase());
    const requiredRoleLower = requiredRole.toLowerCase();

    console.log('User roles:', userRoles);
    console.log('Required role:', requiredRoleLower);

    const hasRequiredRole = userRoles.includes(requiredRoleLower);
    console.log('Has required role:', hasRequiredRole);

    return hasRequiredRole;
  }
}