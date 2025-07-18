"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const role_entity_1 = require("./entities/role.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const school_entity_1 = require("../schools/entities/school.entity");
const user_school_role_entity_1 = require("../users/entities/user-school-role.entity");
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role, role_permission_entity_1.RolePermission, permission_entity_1.Permission, school_entity_1.School, user_school_role_entity_1.UserSchoolRole])],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService],
        exports: [roles_service_1.RolesService, typeorm_1.TypeOrmModule],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map