import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { SignupDto } from './dto/user.SignupDto';
import { LoginDto } from './dto/user.LoginDto';

@Controller('user')
export class UserController { 
    constructor(private readonly userService:UserService){}

    @Post('/signup')
    async signup(@Body() SignupDto:SignupDto){
        return await this.userService.signup(SignupDto);      
    }

    @Post("/login")
    async login(@Body() LoginDto:LoginDto):Promise<User>{
        return await this.userService.login(LoginDto)

    }

    // @Get('/Userlist')
    // async getUsers(): Promise<User[]>{
    //     return await this.userService.getUsers();
    // }

    @Delete('/id')
    async deleteUser(@Body() body:number)
    {
        return await this.userService.deleteUser(body)
    }

    }
//return promise
//wait for promise