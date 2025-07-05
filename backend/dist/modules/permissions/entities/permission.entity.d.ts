import { BaseEntity } from '../../../common/entities/base.entity';
import { RolePermission } from '@/modules/roles/entities/role-permission.entity';
export declare class Permission extends BaseEntity {
    name: string;
    description: string;
    category: string;
    isActive: boolean;
    rolePermissions: RolePermission[];
}
