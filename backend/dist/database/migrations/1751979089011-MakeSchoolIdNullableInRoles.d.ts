import { MigrationInterface, QueryRunner } from "typeorm";
export declare class MakeSchoolIdNullableInRoles1751979089011 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
