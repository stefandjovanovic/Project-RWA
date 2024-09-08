"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1725834189500 = void 0;
class $npmConfigName1725834189500 {
    constructor() {
        this.name = ' $npmConfigName1725834189500';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "playerDetailsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_8f4230b1748192643d2b995b512" UNIQUE ("playerDetailsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "managerDetailsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_fb43359514ff34ad59b44f23a65" UNIQUE ("managerDetailsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8f4230b1748192643d2b995b512" FOREIGN KEY ("playerDetailsId") REFERENCES "player_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb43359514ff34ad59b44f23a65" FOREIGN KEY ("managerDetailsId") REFERENCES "manager_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb43359514ff34ad59b44f23a65"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8f4230b1748192643d2b995b512"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_fb43359514ff34ad59b44f23a65"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "managerDetailsId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_8f4230b1748192643d2b995b512"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "playerDetailsId"`);
    }
}
exports.$npmConfigName1725834189500 = $npmConfigName1725834189500;
//# sourceMappingURL=1725834189500-$npm_config_name.js.map