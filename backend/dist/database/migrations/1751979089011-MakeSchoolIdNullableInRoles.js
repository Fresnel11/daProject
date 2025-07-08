"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeSchoolIdNullableInRoles1751979089011 = void 0;
class MakeSchoolIdNullableInRoles1751979089011 {
    constructor() {
        this.name = 'MakeSchoolIdNullableInRoles1751979089011';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`role_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_25d24010f53bb80b78e412c965\` (\`role_id\`, \`permission_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`school_id\` varchar(255) NULL, \`is_system_role\` tinyint NOT NULL DEFAULT 0, \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_162b4502fd9fb2b641cea72fec\` (\`name\`, \`school_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_parents\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`student_id\` varchar(255) NOT NULL, \`parent_id\` varchar(255) NOT NULL, \`relationship_type\` varchar(255) NOT NULL, \`is_primary_contact\` tinyint NOT NULL DEFAULT 0, \`is_emergency_contact\` tinyint NOT NULL DEFAULT 0, \`can_pickup\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_ad07904dc74a079fb1d7d82825\` (\`student_id\`, \`parent_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`student_id\` varchar(255) NOT NULL, \`school_id\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`gender\` varchar(255) NOT NULL, \`class_level\` varchar(255) NULL, \`section\` varchar(255) NULL, \`enrollment_date\` date NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`notes\` varchar(255) NULL, UNIQUE INDEX \`IDX_e37ee7c3f5038677514d9cc5f4\` (\`student_id\`, \`school_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schools\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`postal_code\` varchar(255) NOT NULL, \`website\` varchar(255) NULL, \`description\` varchar(255) NULL, \`logo_url\` varchar(255) NULL, \`status\` enum ('pending', 'validated', 'rejected', 'suspended') NOT NULL DEFAULT 'pending', \`registration_number\` varchar(255) NULL, \`tax_number\` varchar(255) NULL, \`director_first_name\` varchar(255) NOT NULL, \`director_last_name\` varchar(255) NOT NULL, \`director_email\` varchar(255) NOT NULL, \`director_phone\` varchar(255) NOT NULL, \`validated_at\` timestamp NULL, \`validated_by\` varchar(255) NULL, \`rejection_reason\` varchar(255) NULL, \`schoolType\` enum ('elementary', 'middle', 'high', 'university', 'private', 'charter') NOT NULL, \`estimatedEnrollment\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_74a5374cf6d1c970dd47f888bf\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_school_roles\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` varchar(255) NOT NULL, \`school_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_validated\` tinyint NOT NULL DEFAULT 0, \`invited_by\` varchar(255) NULL, \`invitation_token\` varchar(255) NULL, \`invitation_expires\` timestamp NULL, \`joined_at\` timestamp NULL, UNIQUE INDEX \`IDX_cdb818f4c962a1285d54c397d3\` (\`user_id\`, \`school_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`type\` enum ('admin', 'teacher', 'parent', 'student') NOT NULL, \`phone\` varchar(255) NULL, \`date_of_birth\` date NULL, \`profile_picture_url\` varchar(255) NULL, \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`email_verification_token\` varchar(255) NULL, \`password_reset_token\` varchar(255) NULL, \`password_reset_expires\` timestamp NULL, \`last_login_at\` timestamp NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_178199805b901ccd220ab7740ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_17022daf3f885f7d35423e9971e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD CONSTRAINT \`FK_55dc8a573b4ceb933103cf999ba\` FOREIGN KEY (\`school_id\`) REFERENCES \`schools\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_parents\` ADD CONSTRAINT \`FK_ab5687be754283635fffe3692ee\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_parents\` ADD CONSTRAINT \`FK_d4d691ddbc51607ae462b68e16c\` FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_aa8edc7905ad764f85924569647\` FOREIGN KEY (\`school_id\`) REFERENCES \`schools\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` ADD CONSTRAINT \`FK_2ccae0d70456047b85806e94401\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` ADD CONSTRAINT \`FK_b13f33aafb402f7954c003f5245\` FOREIGN KEY (\`school_id\`) REFERENCES \`schools\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` ADD CONSTRAINT \`FK_96d1b6feed37ab92289bacf31f4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` ADD CONSTRAINT \`FK_e6496eb2d71b3ffa46f6e5f31ce\` FOREIGN KEY (\`invited_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` DROP FOREIGN KEY \`FK_e6496eb2d71b3ffa46f6e5f31ce\``);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` DROP FOREIGN KEY \`FK_96d1b6feed37ab92289bacf31f4\``);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` DROP FOREIGN KEY \`FK_b13f33aafb402f7954c003f5245\``);
        await queryRunner.query(`ALTER TABLE \`user_school_roles\` DROP FOREIGN KEY \`FK_2ccae0d70456047b85806e94401\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_aa8edc7905ad764f85924569647\``);
        await queryRunner.query(`ALTER TABLE \`student_parents\` DROP FOREIGN KEY \`FK_d4d691ddbc51607ae462b68e16c\``);
        await queryRunner.query(`ALTER TABLE \`student_parents\` DROP FOREIGN KEY \`FK_ab5687be754283635fffe3692ee\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_55dc8a573b4ceb933103cf999ba\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_17022daf3f885f7d35423e9971e\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_178199805b901ccd220ab7740ec\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_cdb818f4c962a1285d54c397d3\` ON \`user_school_roles\``);
        await queryRunner.query(`DROP TABLE \`user_school_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_74a5374cf6d1c970dd47f888bf\` ON \`schools\``);
        await queryRunner.query(`DROP TABLE \`schools\``);
        await queryRunner.query(`DROP INDEX \`IDX_e37ee7c3f5038677514d9cc5f4\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP INDEX \`IDX_ad07904dc74a079fb1d7d82825\` ON \`student_parents\``);
        await queryRunner.query(`DROP TABLE \`student_parents\``);
        await queryRunner.query(`DROP INDEX \`IDX_162b4502fd9fb2b641cea72fec\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_25d24010f53bb80b78e412c965\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }
}
exports.MakeSchoolIdNullableInRoles1751979089011 = MakeSchoolIdNullableInRoles1751979089011;
//# sourceMappingURL=1751979089011-MakeSchoolIdNullableInRoles.js.map