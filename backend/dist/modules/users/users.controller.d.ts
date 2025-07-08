import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserSchoolRoleDto } from './dto/update-user-school-role.dto';
import { User } from './entities/user.entity';
import { School } from '../../modules/schools/entities/school.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, school: School, user: User): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        type: import("../../common/enums/user-type.enum").UserType;
        role: string;
    }>;
    invite(inviteUserDto: InviteUserDto, school: School, user: User): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        type: import("../../common/enums/user-type.enum").UserType;
        role: string;
        invitationToken: string;
        message: string;
    }>;
    findAll(school: School): Promise<import("./entities/user-school-role.entity").UserSchoolRole[]>;
    updateRole(userId: string, updateDto: UpdateUserSchoolRoleDto, school: School): Promise<{
        userId: string;
        schoolId: string;
        roleId: string;
        isActive: boolean;
        isValidated: boolean;
    }>;
    remove(userId: string, school: School): Promise<{
        message: string;
    }>;
}
