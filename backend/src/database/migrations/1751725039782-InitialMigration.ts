import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1751725039782 implements MigrationInterface {
    name = 'InitialMigration1751725039782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schools\` ADD \`schoolType\` enum ('elementary', 'middle', 'high', 'university', 'private', 'charter') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schools\` ADD \`estimatedEnrollment\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schools\` DROP COLUMN \`estimatedEnrollment\``);
        await queryRunner.query(`ALTER TABLE \`schools\` DROP COLUMN \`schoolType\``);
    }

}
