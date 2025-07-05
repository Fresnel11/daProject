import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SelectSchoolDto } from './dto/select-school.dto';
import { User } from '@/modules/users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            type: import("../../common/enums/user-type.enum").UserType;
            profilePictureUrl: string;
        };
        accessibleSchools: {
            id: string;
            name: string;
            role: {
                id: string;
                name: string;
            };
        }[];
    }>;
    selectSchool(user: User, selectSchoolDto: SelectSchoolDto): Promise<{
        school: {
            id: string;
            name: string;
            logoUrl: string;
        };
        role: {
            id: string;
            name: string;
        };
    }>;
    getProfile(user: User): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        type: import("../../common/enums/user-type.enum").UserType;
        profilePictureUrl: string;
        isEmailVerified: boolean;
    }>;
}
