import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from './role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
export declare class RolePermission extends BaseEntity {
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
}
