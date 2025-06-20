import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';
import createHttpError from 'http-errors';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signup(data: SignupDto) {
    const createdUser = await this.userService.createUser({
      ...data,
      password: bcrypt.hashSync(data.password.trim(), 10),
    });
    return this.userService.getUserDetails(createdUser)
  }

  async login(data: LoginDto) {
    const find = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!find) {
      throw new BadRequestException('User with email' + data.email + 'does not exist') 
    }
    console.log(find.password, data.password, bcrypt.compareSync(find.password, data.password))
    if (!bcrypt.compareSync(data.password, find.password)) {
      throw new UnauthorizedException("User not authorized")
    }
    const userData = this.userService.getUserDetails(find)
    const tokenSignData = {
      email: userData.email,
      id: userData.id,
    }
    return ({
      ...userData,
      token: this.jwtService.sign(tokenSignData),
      expiresAt: (new Date()).getTime() + 25*1000
    })
  }
}