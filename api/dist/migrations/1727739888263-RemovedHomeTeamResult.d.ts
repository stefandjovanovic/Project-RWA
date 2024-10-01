import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemovedHomeTeamResult1727739888263 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
