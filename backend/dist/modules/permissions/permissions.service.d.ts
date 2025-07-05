import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
export declare class PermissionsService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    findAll(): Promise<Permission[]>;
    findByCategory(category: string): Promise<Permission[]>;
}
