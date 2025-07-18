"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("../user/user.model");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, typeorm_1.TypeOrmModule.forFeature([user_model_1.User]), jwt_1.JwtModule.registerAsync({
                useFactory: () => {
                    const secret = new config_1.SecretValues();
                    const data = secret.getSecret();
                    return {
                        secret: data.secret,
                        global: data.global,
                        signOptions: {
                            expiresIn: '1h'
                        }
                    };
                }
            })],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, user_service_1.UserService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map