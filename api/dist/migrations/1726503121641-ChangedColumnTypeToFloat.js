"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangedColumnTypeToFloat1726503121641 = void 0;
class ChangedColumnTypeToFloat1726503121641 {
    constructor() {
        this.name = 'ChangedColumnTypeToFloat1726503121641';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "latitude" double precision NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "longitude" integer NOT NULL`);
    }
}
exports.ChangedColumnTypeToFloat1726503121641 = ChangedColumnTypeToFloat1726503121641;
//# sourceMappingURL=1726503121641-ChangedColumnTypeToFloat.js.map