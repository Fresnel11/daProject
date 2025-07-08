import { BaseEntity } from '../../../common/entities/base.entity';
import { School } from '../../schools/entities/school.entity';
import { UserSchoolRole } from '../../../modules/users/entities/user-school-role.entity';
import { RolePermission } from './role-permission.entity';
export declare class Role extends BaseEntity {
    name: string;
    description: string;
    schoolId: string | null;
    isSystemRole: boolean;
    isActive: boolean;
    school: School;
    userSchoolRoles: UserSchoolRole[];
    rolePermissions: RolePermission[];
}
