export declare class SecretValues {
    private SECRET;
    private HOST;
    private DBPORT;
    private DBUSER;
    private PASSWORD;
    private DATABASE;
    private SYNCHRONIZE;
    private SSL;
    private GLOBAL;
    constructor();
    getSecret(): {
        secret: string;
        host: string;
        dbport: number;
        password: string;
        dbuser: string;
        database: string;
        synchronize: boolean;
        ssl: boolean;
        global: boolean;
    };
}
