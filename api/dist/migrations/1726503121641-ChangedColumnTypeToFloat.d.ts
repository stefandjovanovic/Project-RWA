import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ChangedColumnTypeToFloat1726503121641 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
