import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';

@Injectable()

export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async getUsers():Promise<User[]>{
        return await this.userRepository.find();

    }

    async addUser(data:User):Promise<User>{
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    
    async deleteUser(id:number){
        try{
            return this.userRepository.delete(id);
        }
        catch{
            throw new NotFoundException(`User with id ${id} not found`);
        }
        
    }
    

}
