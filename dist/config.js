"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretValues = void 0;
class SecretValues {
    SECRET;
    HOST;
    DBPORT;
    DBUSER;
    PASSWORD;
    DATABASE;
    SYNCHRONIZE;
    SSL;
    GLOBAL;
    constructor() {
        this.SECRET = process.env.JWT_SECRET;
        this.HOST = process.env.HOST;
        this.DBPORT = Number(process.env.DBPORT);
        this.DBUSER = process.env.DBUSER;
        this.PASSWORD = process.env.PASSWORD;
        this.DATABASE = process.env.DATABASE;
        this.SYNCHRONIZE = Boolean(process.env.SYNCHRONIZE);
        this.SSL = Boolean(process.env.SSL);
        this.GLOBAL = Boolean(process.env.GLOBAL);
    }
    getSecret() {
        return {
            secret: this.SECRET,
            host: this.HOST,
            dbport: this.DBPORT,
            password: this.PASSWORD,
            dbuser: this.DBUSER,
            database: this.DATABASE,
            synchronize: this.SYNCHRONIZE,
            ssl: this.SSL,
            global: this.GLOBAL,
        };
    }
}
exports.SecretValues = SecretValues;
//# sourceMappingURL=config.js.map