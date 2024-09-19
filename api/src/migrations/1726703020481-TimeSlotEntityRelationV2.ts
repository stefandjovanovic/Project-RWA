import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeSlotEntityRelationV21726703020481 implements MigrationInterface {
    name = 'TimeSlotEntityRelationV21726703020481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_participants_player_details" ("eventId" uuid NOT NULL, "playerDetailsId" uuid NOT NULL, CONSTRAINT "PK_8101eb73fdfb023b7690846d5c7" PRIMARY KEY ("eventId", "playerDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ecbf609a3f2df954504ac67fb6" ON "event_participants_player_details" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e99b2f606d1e07df418961308b" ON "event_participants_player_details" ("playerDetailsId") `);
        await queryRunner.query(`ALTER TABLE "event_participants_player_details" ADD CONSTRAINT "FK_ecbf609a3f2df954504ac67fb62" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_participants_player_details" ADD CONSTRAINT "FK_e99b2f606d1e07df418961308b5" FOREIGN KEY ("playerDetailsId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants_player_details" DROP CONSTRAINT "FK_e99b2f606d1e07df418961308b5"`);
        await queryRunner.query(`ALTER TABLE "event_participants_player_details" DROP CONSTRAINT "FK_ecbf609a3f2df954504ac67fb62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e99b2f606d1e07df418961308b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ecbf609a3f2df954504ac67fb6"`);
        await queryRunner.query(`DROP TABLE "event_participants_player_details"`);
    }

}
