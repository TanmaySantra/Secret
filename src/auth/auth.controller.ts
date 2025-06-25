import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/core/AuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('/signup')
  async signup(@Body() signupDto:SignupDto){
    console.log(signupDto)
    return await this.authService.signup(signupDto);      
  }

  @Post("/login")
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get("/protected")
  async testProtected(@Request() req:Request) {
    console.log(req)
    return "working"
  }
}
