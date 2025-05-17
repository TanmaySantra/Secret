import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: `${process.env.JWT_SECRET}`,
    signOptions: {
      algorithm: 'HS256',
      expiresIn: '25s'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
