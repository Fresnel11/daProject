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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const user_entity_1 = require("./entities/user.entity");
const user_school_role_entity_1 = require("./entities/user-school-role.entity");
const role_entity_1 = require("../../modules/roles/entities/role.entity");
const school_entity_1 = require("../schools/entities/school.entity");
const school_status_enum_1 = require("../../common/enums/school-status.enum");
let UsersService = class UsersService {
    constructor(userRepository, userSchoolRoleRepository, roleRepository, schoolRepository) {
        this.userRepository = userRepository;
        this.userSchoolRoleRepository = userSchoolRoleRepository;
        this.roleRepository = roleRepository;
        this.schoolRepository = schoolRepository;
    }
    async createUser(createUserDto, schoolId, createdBy) {
        const school = await this.schoolRepository.findOne({
            where: { id: schoolId, status: school_status_enum_1.SchoolStatus.VALIDATED },
        });
        if (!school) {
            throw new common_1.NotFoundException('School not found or not validated');
        }
        const role = await this.roleRepository.findOne({
            where: { id: createUserDto.roleId, schoolId },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found in this school');
        }
        let user = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (!user) {
            const passwordHash = await bcrypt.hash(createUserDto.password, 10);
            user = this.userRepository.create({
                email: createUserDto.email,
                passwordHash,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                type: createUserDto.type,
                phone: createUserDto.phone,
                dateOfBirth: createUserDto.dateOfBirth,
                isEmailVerified: false,
            });
            user = await this.userRepository.save(user);
        }
        const existingRole = await this.userSchoolRoleRepository.findOne({
            where: { userId: user.id, schoolId },
        });
        if (existingRole) {
            throw new common_1.ConflictException('User already has a role in this school');
        }
        const userSchoolRole = this.userSchoolRoleRepository.create({
            userId: user.id,
            schoolId,
            roleId: createUserDto.roleId,
            isActive: true,
            isValidated: true,
            invitedBy: createdBy,
            joinedAt: new Date(),
        });
        await this.userSchoolRoleRepository.save(userSchoolRole);
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            role: role.name,
        };
    }
    async inviteUser(inviteUserDto, schoolId, invitedBy) {
        const school = await this.schoolRepository.findOne({
            where: { id: schoolId, status: school_status_enum_1.SchoolStatus.VALIDATED },
        });
        if (!school) {
            throw new common_1.NotFoundException('School not found or not validated');
        }
        const role = await this.roleRepository.findOne({
            where: { id: inviteUserDto.roleId, schoolId },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found in this school');
        }
        let user = await this.userRepository.findOne({
            where: { email: inviteUserDto.email },
        });
        if (!user) {
            user = this.userRepository.create({
                email: inviteUserDto.email,
                passwordHash: '',
                firstName: inviteUserDto.firstName,
                lastName: inviteUserDto.lastName,
                type: inviteUserDto.type,
                phone: inviteUserDto.phone,
                isEmailVerified: false,
                isActive: false,
            });
            user = await this.userRepository.save(user);
        }
        const existingRole = await this.userSchoolRoleRepository.findOne({
            where: { userId: user.id, schoolId },
        });
        if (existingRole) {
            throw new common_1.ConflictException('User already has a role in this school');
        }
        const invitationToken = (0, uuid_1.v4)();
        const invitationExpires = new Date();
        invitationExpires.setDate(invitationExpires.getDate() + 7);
        const userSchoolRole = this.userSchoolRoleRepository.create({
            userId: user.id,
            schoolId,
            roleId: inviteUserDto.roleId,
            isActive: false,
            isValidated: false,
            invitedBy,
            invitationToken,
            invitationExpires,
        });
        await this.userSchoolRoleRepository.save(userSchoolRole);
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            role: role.name,
            invitationToken,
            message: 'Invitation sent successfully',
        };
    }
    async updateUserSchoolRole(userId, schoolId, updateDto) {
        const userSchoolRole = await this.userSchoolRoleRepository.findOne({
            where: { userId, schoolId },
            relations: ['user', 'role', 'school'],
        });
        if (!userSchoolRole) {
            throw new common_1.NotFoundException('User role not found in this school');
        }
        if (updateDto.roleId) {
            const role = await this.roleRepository.findOne({
                where: { id: updateDto.roleId, schoolId },
            });
            if (!role) {
                throw new common_1.NotFoundException('Role not found in this school');
            }
            userSchoolRole.roleId = updateDto.roleId;
        }
        if (updateDto.isActive !== undefined) {
            userSchoolRole.isActive = updateDto.isActive;
        }
        if (updateDto.isValidated !== undefined) {
            userSchoolRole.isValidated = updateDto.isValidated;
        }
        await this.userSchoolRoleRepository.save(userSchoolRole);
        return {
            userId: userSchoolRole.userId,
            schoolId: userSchoolRole.schoolId,
            roleId: userSchoolRole.roleId,
            isActive: userSchoolRole.isActive,
            isValidated: userSchoolRole.isValidated,
        };
    }
    async getUsersInSchool(schoolId) {
        return this.userSchoolRoleRepository.find({
            where: { schoolId },
            relations: ['user', 'role'],
            order: { createdAt: 'DESC' },
        });
    }
    async removeUserFromSchool(userId, schoolId) {
        const userSchoolRole = await this.userSchoolRoleRepository.findOne({
            where: { userId, schoolId },
        });
        if (!userSchoolRole) {
            throw new common_1.NotFoundException('User role not found in this school');
        }
        await this.userSchoolRoleRepository.remove(userSchoolRole);
        return { message: 'User removed from school successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_school_role_entity_1.UserSchoolRole)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(3, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map