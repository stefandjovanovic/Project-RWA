"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotEntityRelation1726702479659 = void 0;
class TimeSlotEntityRelation1726702479659 {
    constructor() {
        this.name = 'TimeSlotEntityRelation1726702479659';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event" ADD "timeSlotId" uuid`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "UQ_54b847b8b0242b696d28d103a18" UNIQUE ("timeSlotId")`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_54b847b8b0242b696d28d103a18" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_54b847b8b0242b696d28d103a18"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "UQ_54b847b8b0242b696d28d103a18"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "timeSlotId"`);
    }
}
exports.TimeSlotEntityRelation1726702479659 = TimeSlotEntityRelation1726702479659;
//# sourceMappingURL=1726702479659-TimeSlotEntityRelation.js.map