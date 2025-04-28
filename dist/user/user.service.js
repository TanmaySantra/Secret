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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("./user.model");
const typeorm_2 = require("typeorm");
const http_errors_1 = require("http-errors");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signup(data) {
        const exist = await this.userRepository.findOne({ where: { email: data.email } });
        if (exist) {
            throw (0, http_errors_1.default)(500, 'User already exists');
        }
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    async login(data) {
        const find = await this.userRepository.findOne({ where: { email: data.email } });
        if (!find) {
            throw (0, http_errors_1.default)(400, "User with email" + data.email + "does not exist");
        }
        const user = new user_model_1.User();
        user.email = find.email;
        user.id = find.id;
        user.password = find.password;
        return await user;
    }
    async deleteUser(id) {
        try {
            return this.userRepository.delete(id);
        }
        catch {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map