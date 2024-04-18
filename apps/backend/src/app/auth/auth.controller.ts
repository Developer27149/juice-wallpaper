import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UniqueUserPipe } from '../../pipes/index';
import { jwtCookieOption } from '../../utils/cookie';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  async getUser(@Query('token') token: string) {
    return this.authService.getUser(token);
  }

  @Post('register')
  async register(@Res() res: Response, @Body(UniqueUserPipe) createUserDto: CreateUserDto) {
    const { token, user } = await this.authService.register(createUserDto);
    res.cookie('token', token, jwtCookieOption);
    return res.status(200).json(user);
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    console.log('loginUser', loginUserDto);
    const { token, user } = await this.authService.login(loginUserDto);
    res.cookie('token', token, jwtCookieOption);
    return res.status(200).json(user);
  }
}
