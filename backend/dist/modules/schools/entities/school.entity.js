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
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const school_status_enum_1 = require("../../../common/enums/school-status.enum");
const user_school_role_entity_1 = require("../../users/entities/user-school-role.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const student_entity_1 = require("../../students/entities/student.entity");
let School = class School extends base_entity_1.BaseEntity {
    get directorFullName() {
        return `${this.directorFirstName} ${this.directorLastName}`;
    }
};
exports.School = School;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], School.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], School.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], School.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], School.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], School.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], School.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code' }),
    __metadata("design:type", String)
], School.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], School.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], School.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_url', nullable: true }),
    __metadata("design:type", String)
], School.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: school_status_enum_1.SchoolStatus, default: school_status_enum_1.SchoolStatus.PENDING }),
    __metadata("design:type", String)
], School.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', nullable: true }),
    __metadata("design:type", String)
], School.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_number', nullable: true }),
    __metadata("design:type", String)
], School.prototype, "taxNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_first_name' }),
    __metadata("design:type", String)
], School.prototype, "directorFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_last_name' }),
    __metadata("design:type", String)
], School.prototype, "directorLastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_email' }),
    __metadata("design:type", String)
], School.prototype, "directorEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_phone' }),
    __metadata("design:type", String)
], School.prototype, "directorPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], School.prototype, "validatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_by', nullable: true }),
    __metadata("design:type", String)
], School.prototype, "validatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', nullable: true }),
    __metadata("design:type", String)
], School.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_school_role_entity_1.UserSchoolRole, (userSchoolRole) => userSchoolRole.school),
    __metadata("design:type", Array)
], School.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => role_entity_1.Role, (role) => role.school),
    __metadata("design:type", Array)
], School.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (student) => student.school),
    __metadata("design:type", Array)
], School.prototype, "students", void 0);
exports.School = School = __decorate([
    (0, typeorm_1.Entity)('schools')
], School);
//# sourceMappingURL=school.entity.js.map