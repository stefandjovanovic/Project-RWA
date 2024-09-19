import { MigrationInterface, QueryRunner } from "typeorm";

export class FIXEDHALLRELATION1726519785228 implements MigrationInterface {
    name = 'FIXEDHALLRELATION1726519785228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager_details" DROP CONSTRAINT "FK_909ffcf9c62a60b3ba539cad2e6"`);
        await queryRunner.query(`ALTER TABLE "manager_details" DROP COLUMN "courtsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager_details" ADD "courtsId" uuid`);
        await queryRunner.query(`ALTER TABLE "manager_details" ADD CONSTRAINT "FK_909ffcf9c62a60b3ba539cad2e6" FOREIGN KEY ("courtsId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
