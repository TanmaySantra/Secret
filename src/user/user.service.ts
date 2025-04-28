import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/user.LoginDto';
import { SignupDto } from './dto/user.SignupDto';
import createHttpError from 'http-errors';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './interfaces/user.interface';

@Injectable()

export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async createUser(data:SignupDto):Promise<User>{
        const exist = await this.userRepository.findOne({where:{email:data.email}})
        if(exist)
        {
            throw  createHttpError(500,'User already exists')
        }
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }

    async getUser(email:string):Promise<UserDetails>{
        const getUser = await this.userRepository.findOneBy({email});
        if(!getUser)
        {
            throw createHttpError("User not found");
        }
        const user:UserDetails ={
            id: getUser.id,
            email:getUser.email ,
            firstname: getUser.firstname,
            lastname: getUser.lastname
        }
        return user
    }

    async getallUsers(){
        
    }
    async login(data:LoginDto){
        const find = await this.userRepository.findOne({where:{email:data.email}});
        if(!find)
        {
            throw createHttpError(400,"User with email"+data.email+"does not exist")
        }
        const user:User =new User()
        user.email=find.email;
        user.id=find.id;
        user.password=find.password;
        return await user

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
