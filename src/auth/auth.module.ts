import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { SecretValues } from 'src/config';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]), JwtModule.registerAsync({ 
    useFactory: ()=>{
      const secret = new SecretValues();
      const data = secret.getSecret();
      return{
        secret:data.secret,
        global: data.global,
        signOptions: {
          expiresIn: '1h'
        }   
      }
    }
    })],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
