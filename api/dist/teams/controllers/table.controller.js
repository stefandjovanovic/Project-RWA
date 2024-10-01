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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const common_1 = require("@nestjs/common");
const table_service_1 = require("../services/table.service");
let TableController = class TableController {
    constructor(tableService) {
        this.tableService = tableService;
    }
    getTableData() {
        return this.tableService.getTableData();
    }
    getTeamResults(teamId) {
        return this.tableService.getTeamResults(teamId);
    }
};
exports.TableController = TableController;
__decorate([
    (0, common_1.Get)('/data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TableController.prototype, "getTableData", null);
__decorate([
    (0, common_1.Get)('/team-results/:teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "getTeamResults", null);
exports.TableController = TableController = __decorate([
    (0, common_1.Controller)('table'),
    __metadata("design:paramtypes", [table_service_1.TableService])
], TableController);
//# sourceMappingURL=table.controller.js.map