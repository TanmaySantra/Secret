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
    secret: `60284990c67c24a885e2d20f6964ed5e161e93a36fe4a244de466df8aad83738b4a06e6db66a119f048f3547d24f35a3153e6948ff9da6cea0440727cfc5b1b3ec3ed849e389b146d9363c320cdcf7b02e38f658f063221fd24cba7d2ad2f577fe6b05dbfb108ddf87c401c8f6d51d53f82a0046c6a1c5bf926f5a29886bf6cc7731665deb03d27a2e548f92f1927a6c4e727324076b604152d87151b9dc9cfb59103065b74ac68d664acd46b7be27018e8705bd2d1d82e16297fe18ecb0a776287b2838320893ac2aff6b83a68f5bc201ba0318f1c6b3bdc16ba0d13cbce51baca85489571c0733be30aaf6d47636b5a43c8a314fa0015abd3e04b837675429`,
    signOptions: {
      expiresIn: '1h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
