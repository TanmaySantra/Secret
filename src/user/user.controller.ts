import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController { 
    constructor(private readonly userService:UserService){}

    

    // @Get('/Userlist')
    // async getUsers(): Promise<User[]>{
    //     return await this.userService.getUsers();
    // }

    // @Delete('/id')
    // async deleteUser(@Body() body:number)
    // {
    //     return await this.userService.deleteUser(body)
    // }

}