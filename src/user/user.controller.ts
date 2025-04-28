import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController { 
    constructor(private readonly userService:UserService){}
    @Post('/insert')
    async addUser(@Body() body:any){
        return await this.userService.addUser(body);      
    }

    @Get('/list')
    async getUsers(): Promise<User[]>{
        return await this.userService.getUsers();
    }

    @Delete('/id')
    async deleteUser(@Body() body:number)
    {
        return await this.userService.deleteUser(body)
    }

    }
//return promise
//wait for promise