import { UserType } from '../../../common/enums/user-type.enum';
export declare class InviteUserDto {
    email: string;
    firstName: string;
    lastName: string;
    type: UserType;
    phone?: string;
    roleId: string;
}
