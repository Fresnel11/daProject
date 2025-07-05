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
exports.UserSchoolRole = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("./user.entity");
const school_entity_1 = require("../../schools/entities/school.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
let UserSchoolRole = class UserSchoolRole extends base_entity_1.BaseEntity {
};
exports.UserSchoolRole = UserSchoolRole;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], UserSchoolRole.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'school_id' }),
    __metadata("design:type", String)
], UserSchoolRole.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id' }),
    __metadata("design:type", String)
], UserSchoolRole.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], UserSchoolRole.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_validated', default: false }),
    __metadata("design:type", Boolean)
], UserSchoolRole.prototype, "isValidated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invited_by', nullable: true }),
    __metadata("design:type", String)
], UserSchoolRole.prototype, "invitedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invitation_token', nullable: true }),
    __metadata("design:type", String)
], UserSchoolRole.prototype, "invitationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invitation_expires', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserSchoolRole.prototype, "invitationExpires", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'joined_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserSchoolRole.prototype, "joinedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.schoolRoles),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserSchoolRole.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_entity_1.School, (school) => school.userRoles),
    (0, typeorm_1.JoinColumn)({ name: 'school_id' }),
    __metadata("design:type", school_entity_1.School)
], UserSchoolRole.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.userSchoolRoles),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], UserSchoolRole.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'invited_by' }),
    __metadata("design:type", user_entity_1.User)
], UserSchoolRole.prototype, "invitedByUser", void 0);
exports.UserSchoolRole = UserSchoolRole = __decorate([
    (0, typeorm_1.Entity)('user_school_roles'),
    (0, typeorm_1.Index)(['userId', 'schoolId'], { unique: true })
], UserSchoolRole);
//# sourceMappingURL=user-school-role.entity.js.map