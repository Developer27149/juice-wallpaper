import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';
import { UniqueUserPipe } from '../../pipes/index';
import { jwtCookieOption } from '../../utils/cookie';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Res() res: Response, @Body(UniqueUserPipe) createUserDto: CreateUserDto) {
    const { jwt, user } = await this.authService.register(createUserDto);
    res.cookie('jwt', jwt, jwtCookieOption);
    return res.status(200).json(user);
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    console.log('loginUser', loginUserDto);
    const { jwt, user } = await this.authService.login(loginUserDto);
    res.cookie('jwt', jwt, jwtCookieOption);
    return res.status(200).json(user);
  }



}
