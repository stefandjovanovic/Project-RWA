"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIXEDHALLRELATION1726519785228 = void 0;
class FIXEDHALLRELATION1726519785228 {
    constructor() {
        this.name = 'FIXEDHALLRELATION1726519785228';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "manager_details" DROP CONSTRAINT "FK_909ffcf9c62a60b3ba539cad2e6"`);
        await queryRunner.query(`ALTER TABLE "manager_details" DROP COLUMN "courtsId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "manager_details" ADD "courtsId" uuid`);
        await queryRunner.query(`ALTER TABLE "manager_details" ADD CONSTRAINT "FK_909ffcf9c62a60b3ba539cad2e6" FOREIGN KEY ("courtsId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.FIXEDHALLRELATION1726519785228 = FIXEDHALLRELATION1726519785228;
//# sourceMappingURL=1726519785228-FIXED_HALL_RELATION.js.map