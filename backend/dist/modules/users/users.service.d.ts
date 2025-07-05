import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSchoolRole } from './entities/user-school-role.entity';
import { Role } from '../../modules/roles/entities/role.entity';
import { School } from '@/modules/schools/entities/school.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserSchoolRoleDto } from './dto/update-user-school-role.dto';
export declare class UsersService {
    private userRepository;
    private userSchoolRoleRepository;
    private roleRepository;
    private schoolRepository;
    constructor(userRepository: Repository<User>, userSchoolRoleRepository: Repository<UserSchoolRole>, roleRepository: Repository<Role>, schoolRepository: Repository<School>);
    createUser(createUserDto: CreateUserDto, schoolId: string, createdBy: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        type: import("../../common/enums/user-type.enum").UserType;
        role: string;
    }>;
    inviteUser(inviteUserDto: InviteUserDto, schoolId: string, invitedBy: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        type: import("../../common/enums/user-type.enum").UserType;
        role: string;
        invitationToken: string;
        message: string;
    }>;
    updateUserSchoolRole(userId: string, schoolId: string, updateDto: UpdateUserSchoolRoleDto): Promise<{
        userId: string;
        schoolId: string;
        roleId: string;
        isActive: boolean;
        isValidated: boolean;
    }>;
    getUsersInSchool(schoolId: string): Promise<UserSchoolRole[]>;
    removeUserFromSchool(userId: string, schoolId: string): Promise<{
        message: string;
    }>;
}
