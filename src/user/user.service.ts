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
    
      const exists = await this.userRepository.findOne({
      where: { email: data.email },
    });
      if (exists) {
      throw new Error('User already exists');
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
      firstName: getUser.firstName,
      lastName: getUser.lastName,
    };
    return user;
  }
  async getUserById(id:string){
    const user = await this.userRepository.findOneBy({id})
    return user
  }

  async getallUsers(): Promise<UserDetails[]> {
    const users = await this.userRepository.find();
    return users.map((item) => ({
      id: item.id,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
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
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
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
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
    };
  }

  getUserDetails(user: User) {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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
