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
exports.SchoolsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schools_service_1 = require("./schools.service");
const create_school_dto_1 = require("./dto/create-school.dto");
const validate_school_dto_1 = require("./dto/validate-school.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let SchoolsController = class SchoolsController {
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    create(createSchoolDto) {
        return this.schoolsService.create(createSchoolDto);
    }
    async checkEmail(email) {
        if (!email)
            return { exists: false };
        const exists = await this.schoolsService.checkEmailExists(email);
        return { exists };
    }
    async checkPhone(phone) {
        if (!phone)
            return { exists: false };
        const exists = await this.schoolsService.checkPhoneExists(phone);
        return { exists };
    }
    async checkWebsite(website) {
        if (!website)
            return { exists: false };
        const exists = await this.schoolsService.checkWebsiteExists(website);
        return { exists };
    }
    findPending() {
        return this.schoolsService.findPendingSchools();
    }
    validateSchool(id, validateSchoolDto, user) {
        return this.schoolsService.validateSchool(id, validateSchoolDto, user.id);
    }
    findOne(id) {
        return this.schoolsService.findById(id);
    }
    findAll() {
        return this.schoolsService.findAll();
    }
};
exports.SchoolsController = SchoolsController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new school' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_dto_1.CreateSchoolDto]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('check-email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Get)('check-phone'),
    __param(0, (0, common_1.Query)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "checkPhone", null);
__decorate([
    (0, common_1.Get)('check-website'),
    __param(0, (0, common_1.Query)('website')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "checkWebsite", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending schools for validation (admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "findPending", null);
__decorate([
    (0, common_1.Patch)(':id/validate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Validate or reject a school (admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, validate_school_dto_1.ValidateSchoolDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "validateSchool", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get school by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all schools (admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "findAll", null);
exports.SchoolsController = SchoolsController = __decorate([
    (0, swagger_1.ApiTags)('Schools'),
    (0, common_1.Controller)('schools'),
    __metadata("design:paramtypes", [schools_service_1.SchoolsService])
], SchoolsController);
//# sourceMappingURL=schools.controller.js.map