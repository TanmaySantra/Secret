
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  constructor() {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number, error: any, message: any;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      error = exception.message;
      message = exception.getResponse();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
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
}
