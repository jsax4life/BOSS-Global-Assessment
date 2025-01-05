import { SetMetadata } from '@nestjs/common';

// Thisis a customized decdorator foor role-base access

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
