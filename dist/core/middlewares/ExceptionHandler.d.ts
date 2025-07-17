import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class ExceptionHandler implements ExceptionFilter {
    constructor();
    catch(exception: any, host: ArgumentsHost): void;
}
