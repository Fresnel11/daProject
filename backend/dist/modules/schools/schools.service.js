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
exports.SchoolsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const school_entity_1 = require("./entities/school.entity");
const user_entity_1 = require("../users/entities/user.entity");
const user_school_role_entity_1 = require("../users/entities/user-school-role.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const user_type_enum_1 = require("../../common/enums/user-type.enum");
const school_status_enum_1 = require("../../common/enums/school-status.enum");
const roles_service_1 = require("../roles/roles.service");
let SchoolsService = class SchoolsService {
    constructor(schoolRepository, userRepository, userSchoolRoleRepository, roleRepository, rolesService) {
        this.schoolRepository = schoolRepository;
        this.userRepository = userRepository;
        this.userSchoolRoleRepository = userSchoolRoleRepository;
        this.roleRepository = roleRepository;
        this.rolesService = rolesService;
    }
    async create(createSchoolDto) {
        const existingSchool = await this.schoolRepository.findOne({
            where: { email: createSchoolDto.email },
        });
        if (existingSchool) {
            throw new common_1.ConflictException('School with this email already exists');
        }
        const existingDirector = await this.schoolRepository.findOne({
            where: { directorEmail: createSchoolDto.directorEmail },
        });
        if (existingDirector) {
            throw new common_1.ConflictException('This email is already registered as a director');
        }
        const school = this.schoolRepository.create({
            ...createSchoolDto,
            status: school_status_enum_1.SchoolStatus.PENDING,
        });
        const savedSchool = await this.schoolRepository.save(school);
        const adminRole = await this.roleRepository.findOne({ where: { name: 'admin', schoolId: null } });
        if (!adminRole) {
            throw new common_1.ConflictException('Le rôle admin global n\'existe pas en base');
        }
        let directorUser = await this.userRepository.findOne({
            where: { email: createSchoolDto.directorEmail },
        });
        if (!directorUser) {
            const passwordHash = await bcrypt.hash(createSchoolDto.directorPassword, 10);
            directorUser = this.userRepository.create({
                email: createSchoolDto.directorEmail,
                passwordHash,
                firstName: createSchoolDto.directorFirstName,
                lastName: createSchoolDto.directorLastName,
                type: user_type_enum_1.UserType.ADMIN,
                phone: createSchoolDto.directorPhone,
                isEmailVerified: false,
                isActive: false,
            });
            directorUser = await this.userRepository.save(directorUser);
        }
        const userSchoolRole = this.userSchoolRoleRepository.create({
            userId: directorUser.id,
            schoolId: savedSchool.id,
            roleId: adminRole.id,
            isActive: false,
            isValidated: false,
        });
        await this.userSchoolRoleRepository.save(userSchoolRole);
        return {
            id: savedSchool.id,
            name: savedSchool.name,
            email: savedSchool.email,
            status: savedSchool.status,
            message: 'School registration submitted for validation',
        };
    }
    async validateSchool(schoolId, validateSchoolDto, validatedBy) {
        const school = await this.schoolRepository.findOne({
            where: { id: schoolId },
        });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        if (school.status !== school_status_enum_1.SchoolStatus.PENDING) {
            throw new common_1.ConflictException('School is not in pending status');
        }
        if (validateSchoolDto.approved) {
            school.status = school_status_enum_1.SchoolStatus.VALIDATED;
            school.validatedAt = new Date();
            school.validatedBy = validatedBy;
            await this.userSchoolRoleRepository.update({ schoolId: school.id }, { isActive: true, isValidated: true, joinedAt: new Date() });
            const directorUser = await this.userRepository.findOne({
                where: { email: school.directorEmail },
            });
            if (directorUser) {
                await this.userRepository.update(directorUser.id, {
                    isEmailVerified: true,
                });
            }
        }
        else {
            school.status = school_status_enum_1.SchoolStatus.REJECTED;
            school.rejectionReason = validateSchoolDto.rejectionReason;
        }
        await this.schoolRepository.save(school);
        return {
            id: school.id,
            name: school.name,
            status: school.status,
            message: validateSchoolDto.approved
                ? 'School validated successfully'
                : 'School rejected',
        };
    }
    async findPendingSchools() {
        return this.schoolRepository.find({
            where: { status: school_status_enum_1.SchoolStatus.PENDING },
            order: { createdAt: 'ASC' },
        });
    }
    async findById(id) {
        const school = await this.schoolRepository.findOne({
            where: { id },
        });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        return school;
    }
    async findAll() {
        return this.schoolRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
};
exports.SchoolsService = SchoolsService;
exports.SchoolsService = SchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_school_role_entity_1.UserSchoolRole)),
    __param(3, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        roles_service_1.RolesService])
], SchoolsService);
//# sourceMappingURL=schools.service.js.map