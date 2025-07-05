import { UserType } from '@/common/enums/user-type.enum';
export interface JwtPayload {
    sub: string;
    email: string;
    type: UserType;
    iat?: number;
    exp?: number;
}
