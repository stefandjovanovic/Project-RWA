import { MigrationInterface, QueryRunner } from "typeorm";

export class TeamsAdded1727105973841 implements MigrationInterface {
    name = 'TeamsAdded1727105973841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_54b847b8b0242b696d28d103a18"`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "sport" character varying NOT NULL, "wins" integer NOT NULL, "losses" integer NOT NULL, "draws" integer NOT NULL, "captainUsername" character varying NOT NULL, "captainId" uuid, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sport" character varying NOT NULL, "status" character varying NOT NULL, "resultSubmited" boolean NOT NULL, "courtId" uuid, "timeSlotId" uuid, "challengerTeamId" uuid, "challengedTeamId" uuid, "challengeResultId" uuid, CONSTRAINT "REL_7eb45a34327f5a3f9449164ca5" UNIQUE ("timeSlotId"), CONSTRAINT "REL_7d135cf5d1a2a007face937de9" UNIQUE ("challengeResultId"), CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "homeScore" integer NOT NULL, "awayScore" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "resultStatus" character varying NOT NULL, "homeTeamResult" character varying NOT NULL, CONSTRAINT "PK_0e910b7cd61b8754bb6032d9ad7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_members_player_details" ("teamId" uuid NOT NULL, "playerDetailsId" uuid NOT NULL, CONSTRAINT "PK_e35304f0c342156fc13a13a1796" PRIMARY KEY ("teamId", "playerDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa4b2fbe3e660e30c560e8da9c" ON "team_members_player_details" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6cc2eda9fe638fa31978f49b7" ON "team_members_player_details" ("playerDetailsId") `);
        await queryRunner.query(`ALTER TABLE "event" ADD "belongsTeamId" uuid`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_f71181e2994176fd624db416c24" FOREIGN KEY ("captainId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_54b847b8b0242b696d28d103a18" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_8ae51bff60e7b23e743769ff7d5" FOREIGN KEY ("belongsTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_d5179d4993e736a9d7d27e9834c" FOREIGN KEY ("courtId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_7eb45a34327f5a3f9449164ca55" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_2e3f955303d76198689a886e6fa" FOREIGN KEY ("challengerTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_0327f2ea68794779433a40c6be9" FOREIGN KEY ("challengedTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_7d135cf5d1a2a007face937de9a" FOREIGN KEY ("challengeResultId") REFERENCES "challenge_result"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_members_player_details" ADD CONSTRAINT "FK_aa4b2fbe3e660e30c560e8da9c0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_members_player_details" ADD CONSTRAINT "FK_c6cc2eda9fe638fa31978f49b75" FOREIGN KEY ("playerDetailsId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_members_player_details" DROP CONSTRAINT "FK_c6cc2eda9fe638fa31978f49b75"`);
        await queryRunner.query(`ALTER TABLE "team_members_player_details" DROP CONSTRAINT "FK_aa4b2fbe3e660e30c560e8da9c0"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_7d135cf5d1a2a007face937de9a"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_0327f2ea68794779433a40c6be9"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_2e3f955303d76198689a886e6fa"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_7eb45a34327f5a3f9449164ca55"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_d5179d4993e736a9d7d27e9834c"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_8ae51bff60e7b23e743769ff7d5"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_54b847b8b0242b696d28d103a18"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_f71181e2994176fd624db416c24"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "belongsTeamId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c6cc2eda9fe638fa31978f49b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa4b2fbe3e660e30c560e8da9c"`);
        await queryRunner.query(`DROP TABLE "team_members_player_details"`);
        await queryRunner.query(`DROP TABLE "challenge_result"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_54b847b8b0242b696d28d103a18" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
