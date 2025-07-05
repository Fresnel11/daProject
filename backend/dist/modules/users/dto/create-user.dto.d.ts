import { UserType } from '../../../common/enums/user-type.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    type: UserType;
    phone?: string;
    dateOfBirth?: Date;
    roleId: string;
}
