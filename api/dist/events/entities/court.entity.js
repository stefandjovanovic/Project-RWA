"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Court = void 0;
const typeorm_1 = require("typeorm");
const sport_enum_1 = require("../enums/sport.enum");
const manager_details_entity_1 = require("../../users/entities/manager-details.entity");
const event_entity_1 = require("./event.entity");
const time_slot_entity_1 = require("./time-slot.entity");
let Court = class Court {
};
exports.Court = Court;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Object)
], Court.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Court.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Court.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Court.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Court.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Court.prototype, "isHall", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Court.prototype, "pricePerHour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manager_details_entity_1.ManagerDetails, manager => manager.courts, { cascade: true }),
    __metadata("design:type", manager_details_entity_1.ManagerDetails)
], Court.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, event => event.court, { cascade: true }),
    __metadata("design:type", Array)
], Court.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => time_slot_entity_1.TimeSlot, timeSlot => timeSlot.court, { cascade: true }),
    __metadata("design:type", Array)
], Court.prototype, "timeSlots", void 0);
exports.Court = Court = __decorate([
    (0, typeorm_1.Entity)()
], Court);
//# sourceMappingURL=court.entity.js.map