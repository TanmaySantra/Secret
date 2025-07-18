import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExceptionHandler } from './core/middlewares/ExceptionHandler';
import { ResponseHandler } from './core/middlewares/ResponseHandler';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: false
  });
  app.enableCors()
  app.setGlobalPrefix("api")
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  // Auto-validation
  //We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalInterceptors(new ResponseHandler())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new ExceptionHandler())
  await app.listen(process.env.PORT ?? 8080, () => {
    console.log('Running at http://localhost:' + (process.env.PORT?? 8080));
  });
}
bootstrap();
