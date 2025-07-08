"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const students_service_1 = require("./students.service");
const students_controller_1 = require("./students.controller");
const student_entity_1 = require("./entities/student.entity");
const student_parent_entity_1 = require("./entities/student-parent.entity");
const user_entity_1 = require("../users/entities/user.entity");
const school_entity_1 = require("../../modules/schools/entities/school.entity");
const user_school_role_entity_1 = require("../../modules/users/entities/user-school-role.entity");
const role_permission_entity_1 = require("../../modules/roles/entities/role-permission.entity");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student, student_parent_entity_1.StudentParent, user_entity_1.User, school_entity_1.School, user_school_role_entity_1.UserSchoolRole, role_permission_entity_1.RolePermission])],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
        exports: [students_service_1.StudentsService],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map