import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSchoolRole } from '../../modules/users/entities/user-school-role.entity';
import { School } from '../../modules/schools/entities/school.entity';
export declare class SchoolAccessGuard implements CanActivate {
    private userSchoolRoleRepository;
    private schoolRepository;
    constructor(userSchoolRoleRepository: Repository<UserSchoolRole>, schoolRepository: Repository<School>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
