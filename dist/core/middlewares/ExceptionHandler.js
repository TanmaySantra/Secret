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
exports.ExceptionHandler = void 0;
const common_1 = require("@nestjs/common");
let ExceptionHandler = class ExceptionHandler {
    constructor() { }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let statusCode, error, message;
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            error = exception.message;
            message = exception.getResponse();
        }
        else {
            statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            error = 'Internal server error';
        }
        response.status(statusCode).json({
            statusCode,
            error,
            message: message && message.message ? message.message : error,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.ExceptionHandler = ExceptionHandler;
exports.ExceptionHandler = ExceptionHandler = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [])
], ExceptionHandler);
//# sourceMappingURL=ExceptionHandler.js.map