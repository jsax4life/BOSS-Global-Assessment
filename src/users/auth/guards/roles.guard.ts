import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Normalize roles to lowercase for comparison
    const userRole = user.role?.toLowerCase();
    const normalizedRequiredRoles = requiredRoles.map((role) => role.toLowerCase());

    if (!normalizedRequiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        `Access Denied: Your role (${user.role}) is not allowed. This resource is only available for roles: ${requiredRoles.join(', ')}`
        );
    }

    return true;
  }
}
