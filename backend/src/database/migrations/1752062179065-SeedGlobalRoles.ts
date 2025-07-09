import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedGlobalRoles1752062179065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM roles WHERE school_id IS NULL AND name IN (
              'admin', 'director', 'teacher', 'student', 'parent', 'accountant', 'staff'
            );
        `);
    }

}
