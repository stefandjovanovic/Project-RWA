import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeSlotEntityRelation1726702479659 implements MigrationInterface {
    name = 'TimeSlotEntityRelation1726702479659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "timeSlotId" uuid`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "UQ_54b847b8b0242b696d28d103a18" UNIQUE ("timeSlotId")`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_54b847b8b0242b696d28d103a18" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_54b847b8b0242b696d28d103a18"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "UQ_54b847b8b0242b696d28d103a18"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "timeSlotId"`);
    }

}
