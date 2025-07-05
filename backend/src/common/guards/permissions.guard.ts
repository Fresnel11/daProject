import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PERMISSIONS_KEY } from '@/common/decorators/permissions.decorator';
import { RolePermission } from '@/modules/roles/entities/role-permission.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userSchoolRole = request.userSchoolRole;

    if (!userSchoolRole) {
      throw new ForbiddenException('User role not found');
    }

    // Get user permissions for this role in this school
    const userPermissions = await this.rolePermissionRepository.find({
      where: { roleId: userSchoolRole.roleId },
      relations: ['permission'],
    });

    const userPermissionNames = userPermissions.map(
      (rp) => rp.permission.name,
    );

    // Check if user has all required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      userPermissionNames.includes(permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}