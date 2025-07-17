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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("../user/user.model");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userService;
    userRepository;
    jwtService;
    constructor(userService, userRepository, jwtService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signup(data) {
        const createdUser = await this.userService.createUser({
            ...data,
            password: bcrypt.hashSync(data.password.trim(), 10),
        });
        return this.userService.getUserDetails(createdUser);
    }
    async login(data) {
        const find = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (!find) {
            throw new common_1.BadRequestException('User with email' + data.email + 'does not exist');
        }
        console.log(find.password, data.password, bcrypt.compareSync(find.password, data.password));
        if (!bcrypt.compareSync(data.password, find.password)) {
            throw new common_1.UnauthorizedException("User not authorized");
        }
        const userData = this.userService.getUserDetails(find);
        return ({
            ...userData,
            token: this.jwtService.sign(userData),
            expiresAt: (new Date()).getTime() + 25 * 1000
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_model_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map