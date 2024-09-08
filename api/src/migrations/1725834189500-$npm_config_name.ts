import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1725834189500 implements MigrationInterface {
    name = ' $npmConfigName1725834189500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "playerDetailsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_8f4230b1748192643d2b995b512" UNIQUE ("playerDetailsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "managerDetailsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_fb43359514ff34ad59b44f23a65" UNIQUE ("managerDetailsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8f4230b1748192643d2b995b512" FOREIGN KEY ("playerDetailsId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb43359514ff34ad59b44f23a65" FOREIGN KEY ("managerDetailsId") REFERENCES "manager_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb43359514ff34ad59b44f23a65"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8f4230b1748192643d2b995b512"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_fb43359514ff34ad59b44f23a65"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "managerDetailsId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_8f4230b1748192643d2b995b512"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "playerDetailsId"`);
    }

}
