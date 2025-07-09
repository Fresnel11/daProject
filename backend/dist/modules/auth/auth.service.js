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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const user_school_role_entity_1 = require("../../modules/users/entities/user-school-role.entity");
const school_entity_1 = require("../../modules/schools/entities/school.entity");
let AuthService = class AuthService {
    constructor(userRepository, userSchoolRoleRepository, schoolRepository, jwtService) {
        this.userRepository = userRepository;
        this.userSchoolRoleRepository = userSchoolRoleRepository;
        this.schoolRepository = schoolRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email, isActive: true },
        });
        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            return user;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const userSchoolRoles = await this.userSchoolRoleRepository.find({
            where: {
                userId: user.id,
                isActive: true,
                isValidated: true,
            },
            relations: ['school', 'role'],
        });
        const accessibleSchools = userSchoolRoles
            .filter((usr) => usr.school.status === 'validated')
            .map((usr) => ({
            id: usr.school.id,
            name: usr.school.name,
            role: {
                id: usr.role.id,
                name: usr.role.name,
            },
        }));
        await this.userRepository.update(user.id, {
            lastLoginAt: new Date(),
        });
        const payload = {
            sub: user.id,
            email: user.email,
            type: user.type,
        };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
                profilePictureUrl: user.profilePictureUrl,
            },
            accessibleSchools,
        };
    }
    async selectSchool(userId, schoolId) {
        const userSchoolRole = await this.userSchoolRoleRepository.findOne({
            where: {
                userId,
                schoolId,
                isActive: true,
                isValidated: true,
            },
            relations: ['school', 'role'],
        });
        if (!userSchoolRole || userSchoolRole.school.status !== 'validated') {
            throw new common_1.BadRequestException('Invalid school selection');
        }
        return {
            school: {
                id: userSchoolRole.school.id,
                name: userSchoolRole.school.name,
                logoUrl: userSchoolRole.school.logoUrl,
            },
            role: {
                id: userSchoolRole.role.id,
                name: userSchoolRole.role.name,
            },
        };
    }
    async getUserById(id) {
        return this.userRepository.findOne({
            where: { id, isActive: true },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_school_role_entity_1.UserSchoolRole)),
    __param(2, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map