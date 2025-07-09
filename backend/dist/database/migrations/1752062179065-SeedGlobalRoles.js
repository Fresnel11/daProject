"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedGlobalRoles1752062179065 = void 0;
class SeedGlobalRoles1752062179065 {
    async up(queryRunner) {
        await queryRunner.query(`
            INSERT INTO roles (id, name, description, school_id, is_system_role, is_active, created_at, updated_at)
            VALUES
              (UUID(), 'admin', 'Administrateur global', NULL, true, true, NOW(), NOW()),
              (UUID(), 'director', 'Directeur', NULL, true, true, NOW(), NOW()),
              (UUID(), 'teacher', 'Enseignant', NULL, true, true, NOW(), NOW()),
              (UUID(), 'student', 'Élève', NULL, true, true, NOW(), NOW()),
              (UUID(), 'parent', 'Parent', NULL, true, true, NOW(), NOW()),
              (UUID(), 'accountant', 'Comptable', NULL, true, true, NOW(), NOW()),
              (UUID(), 'staff', 'Personnel', NULL, true, true, NOW(), NOW());
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DELETE FROM roles WHERE school_id IS NULL AND name IN (
              'admin', 'director', 'teacher', 'student', 'parent', 'accountant', 'staff'
            );
        `);
    }
}
exports.SeedGlobalRoles1752062179065 = SeedGlobalRoles1752062179065;
//# sourceMappingURL=1752062179065-SeedGlobalRoles.js.map