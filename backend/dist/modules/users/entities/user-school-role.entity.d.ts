import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';
import { School } from '../../schools/entities/school.entity';
import { Role } from '../../roles/entities/role.entity';
export declare class UserSchoolRole extends BaseEntity {
    userId: string;
    schoolId: string;
    roleId: string;
    isActive: boolean;
    isValidated: boolean;
    invitedBy?: string;
    invitationToken?: string;
    invitationExpires?: Date;
    joinedAt?: Date;
    user: User;
    school: School;
    role: Role;
    invitedByUser?: User;
}
