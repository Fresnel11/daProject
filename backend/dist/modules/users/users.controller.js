"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const invite_user_dto_1 = require("./dto/invite-user.dto");
const update_user_school_role_dto_1 = require("./dto/update-user-school-role.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const school_access_guard_1 = require("../../common/guards/school-access.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const current_school_decorator_1 = require("../../common/decorators/current-school.decorator");
const user_entity_1 = require("./entities/user.entity");
const school_entity_1 = require("../schools/entities/school.entity");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto, school, user) {
        return this.usersService.createUser(createUserDto, school.id, user.id);
    }
    invite(inviteUserDto, school, user) {
        return this.usersService.inviteUser(inviteUserDto, school.id, user.id);
    }
    findAll(school) {
        return this.usersService.getUsersInSchool(school.id);
    }
    updateRole(userId, updateDto, school) {
        return this.usersService.updateUserSchoolRole(userId, school.id, updateDto);
    }
    remove(userId, school) {
        return this.usersService.removeUserFromSchool(userId, school.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('manage_users'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user in the school' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_school_decorator_1.CurrentSchool)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        school_entity_1.School,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('invite'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('invite_users'),
    (0, swagger_1.ApiOperation)({ summary: 'Invite a user to the school' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_school_decorator_1.CurrentSchool)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invite_user_dto_1.InviteUserDto,
        school_entity_1.School,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "invite", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('view_users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users in the school' }),
    __param(0, (0, current_school_decorator_1.CurrentSchool)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_entity_1.School]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':userId/role'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('manage_users'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user role in the school' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_school_decorator_1.CurrentSchool)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_school_role_dto_1.UpdateUserSchoolRoleDto,
        school_entity_1.School]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('manage_users'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove user from the school' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, current_school_decorator_1.CurrentSchool)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, school_entity_1.School]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, school_access_guard_1.SchoolAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiSecurity)('school-id'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map