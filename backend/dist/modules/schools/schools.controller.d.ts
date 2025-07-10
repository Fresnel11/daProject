import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { ValidateSchoolDto } from './dto/validate-school.dto';
import { User } from '@/modules/users/entities/user.entity';
export declare class SchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SchoolsService);
    create(createSchoolDto: CreateSchoolDto): Promise<{
        id: string;
        name: string;
        email: string;
        status: import("../../common/enums/school-status.enum").SchoolStatus;
        message: string;
    }>;
    checkEmail(email: string): Promise<{
        exists: boolean;
    }>;
    checkPhone(phone: string): Promise<{
        exists: boolean;
    }>;
    checkWebsite(website: string): Promise<{
        exists: boolean;
    }>;
    findPending(): Promise<import("./entities/school.entity").School[]>;
    validateSchool(id: string, validateSchoolDto: ValidateSchoolDto, user: User): Promise<{
        id: string;
        name: string;
        status: import("../../common/enums/school-status.enum").SchoolStatus.VALIDATED | import("../../common/enums/school-status.enum").SchoolStatus.REJECTED;
        message: string;
    }>;
    findOne(id: string): Promise<import("./entities/school.entity").School>;
    findAll(): Promise<import("./entities/school.entity").School[]>;
}
