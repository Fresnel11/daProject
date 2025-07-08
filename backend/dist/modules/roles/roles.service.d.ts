import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    createDefaultRolesForSchool(schoolId: string): Promise<Role[]>;
}
