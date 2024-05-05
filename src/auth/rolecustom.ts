import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from './role.guard';

export function Role(role: string) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(RolesGuard),
  );
}
