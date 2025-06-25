import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { Data } from './data/data.model';
import { SecretValues } from './config';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, TypeOrmModule.forRootAsync({
    useFactory: ()=>{
      const secret= new SecretValues();
      const data=secret.getSecret();
      console.log(data)
      return {
        type: 'postgres',
        host: data.host,
        port: data.dbport,
        username: data.dbuser,
        password: data.password,
        database:data.database,
        synchronize:data.synchronize,
        ssl:data.ssl,
        entities:[User,Data],
      }
    }
    }), AuthModule,DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
