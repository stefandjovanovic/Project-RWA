import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedHomeTeamResult1727739888263 implements MigrationInterface {
    name = 'RemovedHomeTeamResult1727739888263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge_result" DROP COLUMN "homeTeamResult"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge_result" ADD "homeTeamResult" character varying NOT NULL`);
    }

}
