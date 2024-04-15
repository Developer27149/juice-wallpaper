import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const { jwt, user } = await this.authService.register(createUserDto);
    res.cookie('jwt', jwt); // Set the cookie
    return user;
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    const jwt = await this.authService.login(loginUserDto);
    res.cookie('jwt', jwt); // Set the cookie
    return jwt;
  }
}
