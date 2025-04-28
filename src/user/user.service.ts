import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import createHttpError from 'http-errors';
import { UserDetails } from './interfaces/user.interface';
import { SignupDto } from 'src/auth/dto/SignupDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: SignupDto): Promise<User> {
    const exist = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (exist) {
      throw createHttpError(500, 'User already exists');
    }
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async getUser(email: string): Promise<UserDetails> {
    const getUser = await this.userRepository.findOneBy({ email });
    if (!getUser) {
      throw createHttpError('User not found');
    }
    const user: UserDetails = {
      id: getUser.id,
      email: getUser.email,
      firstname: getUser.firstname,
      lastname: getUser.lastname,
    };
    return user;
  }

  async getallUsers(): Promise<UserDetails[]> {
    const users = await this.userRepository.find();
    return users.map((item) => ({
      id: item.id,
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
    }));
  }

  async activateUser(id: string): Promise<UserDetails> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw createHttpError('User not found');
    }

    const savedUser = await this.userRepository.save({
      ...user,
      active: true,
    });

    return {
      id: savedUser.id,
      email: savedUser.email,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
    };
  }

  async deactivateUser(id: string): Promise<UserDetails> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw createHttpError('User not found');
    }

    const savedUser = await this.userRepository.save({
      ...user,
      active: false,
    });

    return {
      id: savedUser.id,
      email: savedUser.email,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
    };
  }

  getUserDetails(user: User) {
    return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    };
  }

  //   async deleteUser(id: number) {
  //     try {
  //       return this.userRepository.delete(id);
  //     } catch {
  //       throw new NotFoundException(`User with id ${id} not found`);
  //     }
  //   }
}
