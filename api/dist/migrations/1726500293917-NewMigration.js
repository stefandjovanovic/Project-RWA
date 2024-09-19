"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMigration1726500293917 = void 0;
class NewMigration1726500293917 {
    constructor() {
        this.name = 'NewMigration1726500293917';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "rating" integer NOT NULL, "username" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manager_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courtsId" uuid, CONSTRAINT "PK_ccaab0abdd5deebaf8b6126a507" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "courtId" uuid, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "court" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sport" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "image" character varying NOT NULL, "isHall" boolean NOT NULL, "pricePerHour" integer NOT NULL, "managerId" uuid, CONSTRAINT "PK_d8f2118c52b422b03e0331a7b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "sport" character varying NOT NULL, "numOfParticipants" integer NOT NULL, "maxParticipants" integer NOT NULL, "price" integer NOT NULL, "private" boolean NOT NULL, "ownerId" uuid, "courtId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" character varying NOT NULL, "profilePicture" character varying NOT NULL, CONSTRAINT "PK_681ed52a084694bb3fb81b1fc2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "playerDetailsId" uuid, "managerDetailsId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_8f4230b1748192643d2b995b51" UNIQUE ("playerDetailsId"), CONSTRAINT "REL_fb43359514ff34ad59b44f23a6" UNIQUE ("managerDetailsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manager_details" ADD CONSTRAINT "FK_909ffcf9c62a60b3ba539cad2e6" FOREIGN KEY ("courtsId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "FK_e6ecf74d405f84c555f48a38849" FOREIGN KEY ("courtId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "court" ADD CONSTRAINT "FK_e44af67a945709d134dc1c44baa" FOREIGN KEY ("managerId") REFERENCES "manager_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_697912f4b89965a88b7752f8b65" FOREIGN KEY ("courtId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8f4230b1748192643d2b995b512" FOREIGN KEY ("playerDetailsId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb43359514ff34ad59b44f23a65" FOREIGN KEY ("managerDetailsId") REFERENCES "manager_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb43359514ff34ad59b44f23a65"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8f4230b1748192643d2b995b512"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_697912f4b89965a88b7752f8b65"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "court" DROP CONSTRAINT "FK_e44af67a945709d134dc1c44baa"`);
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "FK_e6ecf74d405f84c555f48a38849"`);
        await queryRunner.query(`ALTER TABLE "manager_details" DROP CONSTRAINT "FK_909ffcf9c62a60b3ba539cad2e6"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "player_details"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "court"`);
        await queryRunner.query(`DROP TABLE "time_slot"`);
        await queryRunner.query(`DROP TABLE "manager_details"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }
}
exports.NewMigration1726500293917 = NewMigration1726500293917;
//# sourceMappingURL=1726500293917-NewMigration.js.map