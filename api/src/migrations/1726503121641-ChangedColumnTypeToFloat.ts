import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedColumnTypeToFloat1726503121641 implements MigrationInterface {
    name = 'ChangedColumnTypeToFloat1726503121641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "latitude" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "longitude" integer NOT NULL`);
    }

}
