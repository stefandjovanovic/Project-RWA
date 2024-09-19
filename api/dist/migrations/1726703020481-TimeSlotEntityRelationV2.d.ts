import { MigrationInterface, QueryRunner } from "typeorm";
export declare class TimeSlotEntityRelationV21726703020481 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
