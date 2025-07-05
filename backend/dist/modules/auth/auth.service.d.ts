import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { UserSchoolRole } from '../../modules/users/entities/user-school-role.entity';
import { School } from '@/modules/schools/entities/school.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private userSchoolRoleRepository;
    private schoolRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, userSchoolRoleRepository: Repository<UserSchoolRole>, schoolRepository: Repository<School>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
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
    selectSchool(userId: string, schoolId: string): Promise<{
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
    getUserById(id: string): Promise<User | null>;
}
