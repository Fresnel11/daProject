import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { User } from '../users/entities/user.entity';
import { UserSchoolRole } from '../users/entities/user-school-role.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { ValidateSchoolDto } from './dto/validate-school.dto';
import { SchoolStatus } from '../../common/enums/school-status.enum';
export declare class SchoolsService {
    private schoolRepository;
    private userRepository;
    private userSchoolRoleRepository;
    private roleRepository;
    constructor(schoolRepository: Repository<School>, userRepository: Repository<User>, userSchoolRoleRepository: Repository<UserSchoolRole>, roleRepository: Repository<Role>);
    create(createSchoolDto: CreateSchoolDto): Promise<{
        id: string;
        name: string;
        email: string;
        status: SchoolStatus;
        message: string;
    }>;
    validateSchool(schoolId: string, validateSchoolDto: ValidateSchoolDto, validatedBy: string): Promise<{
        id: string;
        name: string;
        status: SchoolStatus.VALIDATED | SchoolStatus.REJECTED;
        message: string;
    }>;
    findPendingSchools(): Promise<School[]>;
    findById(id: string): Promise<School>;
    findAll(): Promise<School[]>;
}
