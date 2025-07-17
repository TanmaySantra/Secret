"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const common_1 = require("@nestjs/common");
const ExceptionHandler_1 = require("./core/middlewares/ExceptionHandler");
const ResponseHandler_1 = require("./core/middlewares/ResponseHandler");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
        bodyParser: false
    });
    app.setGlobalPrefix("api");
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    app.useGlobalInterceptors(new ResponseHandler_1.ResponseHandler());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalFilters(new ExceptionHandler_1.ExceptionHandler());
    await app.listen(process.env.PORT ?? 8080, () => {
        console.log('Running at http://localhost:' + (process.env.PORT ?? 8080));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map