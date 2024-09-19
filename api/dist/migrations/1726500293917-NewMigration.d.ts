import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NewMigration1726500293917 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
