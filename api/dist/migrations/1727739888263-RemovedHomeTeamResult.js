"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovedHomeTeamResult1727739888263 = void 0;
class RemovedHomeTeamResult1727739888263 {
    constructor() {
        this.name = 'RemovedHomeTeamResult1727739888263';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "challenge_result" DROP COLUMN "homeTeamResult"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "challenge_result" ADD "homeTeamResult" character varying NOT NULL`);
    }
}
exports.RemovedHomeTeamResult1727739888263 = RemovedHomeTeamResult1727739888263;
//# sourceMappingURL=1727739888263-RemovedHomeTeamResult.js.map