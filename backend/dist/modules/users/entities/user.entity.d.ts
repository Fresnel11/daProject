import { BaseEntity } from '../../../common/entities/base.entity';
import { UserType } from '../../../common/enums/user-type.enum';
import { UserSchoolRole } from './user-school-role.entity';
import { StudentParent } from '../../students/entities/student-parent.entity';
export declare class User extends BaseEntity {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    type: UserType;
    phone?: string;
    dateOfBirth?: Date;
    profilePictureUrl?: string;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    lastLoginAt?: Date;
    isActive: boolean;
    schoolRoles: UserSchoolRole[];
    studentRelations: StudentParent[];
    get fullName(): string;
}
