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
exports.TimeSlot = void 0;
const typeorm_1 = require("typeorm");
const court_entity_1 = require("./court.entity");
const event_entity_1 = require("./event.entity");
let TimeSlot = class TimeSlot {
};
exports.TimeSlot = TimeSlot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Object)
], TimeSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], TimeSlot.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeSlot.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => court_entity_1.Court, court => court.timeSlots),
    __metadata("design:type", court_entity_1.Court)
], TimeSlot.prototype, "court", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => event_entity_1.Event, event => event.timeSlot),
    __metadata("design:type", event_entity_1.Event)
], TimeSlot.prototype, "event", void 0);
exports.TimeSlot = TimeSlot = __decorate([
    (0, typeorm_1.Entity)()
], TimeSlot);
//# sourceMappingURL=time-slot.entity.js.map