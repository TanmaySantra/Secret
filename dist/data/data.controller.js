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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
const createDataDto_1 = require("./dto/createDataDto");
const AuthGuard_1 = require("../core/AuthGuard");
let DataController = class DataController {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    async getHealth() {
        return 'Running';
    }
    async addData(dataDto, req) {
        return await this.dataService.create(dataDto, req["user"]);
    }
    async getOneData(id, req) {
        return await this.dataService.getOne(id, req["user"].id);
    }
    async getAllData(page, take, req) {
        return await this.dataService.getManyByUser(req["user"].id, page, take);
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getHealth", null);
__decorate([
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createDataDto_1.CreateDataDto, Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "addData", null);
__decorate([
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getOneData", null);
__decorate([
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getAllData", null);
exports.DataController = DataController = __decorate([
    (0, common_1.Controller)('secret'),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
//# sourceMappingURL=data.controller.js.map