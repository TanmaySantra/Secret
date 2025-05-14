import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';
import createHttpError from 'http-errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      throw createHttpError(
        400,
        'User with email' + data.email + 'does not exist',
      );
    }

    if (!bcrypt.compareSync(find.password, data.password)) {
      throw createHttpError(400, 'Password does not match');
    }
    return this.userService.getUserDetails(find);
  }
}