"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1751725039782 = void 0;
class InitialMigration1751725039782 {
    constructor() {
        this.name = 'InitialMigration1751725039782';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`schools\` ADD \`schoolType\` enum ('elementary', 'middle', 'high', 'university', 'private', 'charter') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schools\` ADD \`estimatedEnrollment\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`schools\` DROP COLUMN \`estimatedEnrollment\``);
        await queryRunner.query(`ALTER TABLE \`schools\` DROP COLUMN \`schoolType\``);
    }
}
exports.InitialMigration1751725039782 = InitialMigration1751725039782;
//# sourceMappingURL=1751725039782-InitialMigration.js.map