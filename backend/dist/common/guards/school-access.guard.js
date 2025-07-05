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
exports.SchoolAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_school_role_entity_1 = require("../../modules/users/entities/user-school-role.entity");
const school_entity_1 = require("../../modules/schools/entities/school.entity");
const school_status_enum_1 = require("../enums/school-status.enum");
let SchoolAccessGuard = class SchoolAccessGuard {
    constructor(userSchoolRoleRepository, schoolRepository) {
        this.userSchoolRoleRepository = userSchoolRoleRepository;
        this.schoolRepository = schoolRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const schoolId = request.headers['x-school-id'] || request.body?.schoolId;
        if (!schoolId) {
            throw new common_1.BadRequestException('School ID is required');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        const school = await this.schoolRepository.findOne({
            where: { id: schoolId, status: school_status_enum_1.SchoolStatus.VALIDATED },
        });
        if (!school) {
            throw new common_1.UnauthorizedException('School not found or not validated');
        }
        const userSchoolRole = await this.userSchoolRoleRepository.findOne({
            where: {
                userId: user.id,
                schoolId: schoolId,
                isActive: true,
                isValidated: true,
            },
            relations: ['role'],
        });
        if (!userSchoolRole) {
            throw new common_1.UnauthorizedException('User does not have access to this school');
        }
        request.school = school;
        request.userSchoolRole = userSchoolRole;
        return true;
    }
};
exports.SchoolAccessGuard = SchoolAccessGuard;
exports.SchoolAccessGuard = SchoolAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_school_role_entity_1.UserSchoolRole)),
    __param(1, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SchoolAccessGuard);
//# sourceMappingURL=school-access.guard.js.map