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
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_model_1 = require("./data.model");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
let DataService = class DataService {
    secretRepo;
    userService;
    constructor(secretRepo, userService) {
        this.secretRepo = secretRepo;
        this.userService = userService;
    }
    async create(data, user) {
        console.log(user);
        const foundUser = await this.userService.getUserById(user.id);
        const secretData = {
            createdBy: foundUser,
            title: data.title,
            Value: data.value
        };
        console.log("foundUser", secretData);
        const secret = this.secretRepo.create(secretData);
        return await this.secretRepo.save(secret);
    }
    async getOne(id, userId) {
        const find = await this.secretRepo.findOne({ where: { id }, relations: {
                createdBy: true
            } });
        if (!find) {
            throw new common_1.NotFoundException("Data Not found");
        }
        console.log(find.createdBy.id, userId);
        if (find.createdBy.id !== userId) {
            throw new common_1.ForbiddenException("User not allowed to do this task");
        }
        return ({
            ...find,
            createdBy: {
                id: find.createdBy.id,
                firstName: find.createdBy.firstName,
                lastName: find.createdBy.lastName,
                email: find.createdBy.email
            }
        });
    }
    async getManyByUser(userId, page, take) {
        const dataList = await this.secretRepo.find({
            take,
            skip: (page - 1) * take,
            where: {
                createdBy: { id: userId },
            }
        });
        const count = await this.secretRepo.count({ where: { createdBy: { id: userId } } });
        return {
            data: dataList,
            count
        };
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_model_1.Data)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], DataService);
//# sourceMappingURL=data.service.js.map