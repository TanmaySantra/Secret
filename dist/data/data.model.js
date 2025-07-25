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
exports.Data = void 0;
const base_entity_1 = require("../base/base.entity");
const user_model_1 = require("../user/user.model");
const typeorm_1 = require("typeorm");
let Data = class Data extends base_entity_1.BaseEntity {
    title;
    Value;
    createdBy;
};
exports.Data = Data;
__decorate([
    (0, typeorm_1.Column)({ name: "title", type: "varchar" }),
    __metadata("design:type", String)
], Data.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "value", type: "varchar" }),
    __metadata("design:type", String)
], Data.prototype, "Value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.data),
    __metadata("design:type", user_model_1.User)
], Data.prototype, "createdBy", void 0);
exports.Data = Data = __decorate([
    (0, typeorm_1.Entity)('data')
], Data);
//# sourceMappingURL=data.model.js.map