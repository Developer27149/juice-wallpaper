import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  /**
   * 登录服务返回 jwt 和 user 信息
   * @param loginUserDto
   * @returns
   */
  async login(loginUserDto: LoginUserDto) {
    // 根据登录信息，生成 jwt
    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email, password },
    })

    if (!user) {
      throw new Error('Email or password is incorrect');
    }

    const jwtToken = await this.genJWTToken({ email, id: user.id });
    console.log('token:', jwtToken)
    return {
      jwt: jwtToken,
      user,
    }
  }

  /**
   * 注册用户也会返回 jwt 和 user 信息
   * @param createUserDto
   * @returns
   */
  async register(createUserDto: CreateUserDto) {
    // 注册用户
    const data = await this.prisma.user.create({
      data: createUserDto,
    })
    // 注册成功后，生成 jwt 和返回 user 信息
    return this.login({ email: data.email, password: data.password });
  }

  async genJWTToken(payload: { email: string, id: string }): Promise<string> {
    return jwt.sign(payload, process.env.JWT_SECRET ?? '__JWT_SECRET__', { expiresIn: '1h' });
  }

}
