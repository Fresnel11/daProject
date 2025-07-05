import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(): Promise<import("./entities/permission.entity").Permission[]>;
    findByCategory(category: string): Promise<import("./entities/permission.entity").Permission[]>;
}
