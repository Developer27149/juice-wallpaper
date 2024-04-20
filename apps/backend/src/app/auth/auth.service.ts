import { genToken, verifyToken } from '@juice-wallpaper/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

import { DEFAULT_REDIS_NAMESPACE, RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis: Redis;

  constructor(private prisma: PrismaService, private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE);
  }

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
      throw new HttpException('Email or password is incorrect', HttpStatus.UNAUTHORIZED);
    }
    // save key with user email to redis
    const key = Date.now()
    await this.redis.set(`${email}-${key}`, 0)
    return genToken({ email, id: user.id, key });
  }


  /**
   * 退出登录
   * @param token
   * @returns
   */
  async logout(token: string) {
    // 退出登录
    try {
      const { email, key } = verifyToken(token);
      // 删除 redis 中的 key
      return await this.redis.del(`${email}-${key}`)
    } catch (error) {
      console.log('logout error:', error)
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * 注册用户也会返回 jwt 和 user 信息
   * @param createUserDto
   * @returns
   */
  async register(createUserDto: CreateUserDto) {
    // 检查用户名是否存在
    const user = await this.prisma.user.findFirst({
      where: { name: createUserDto.name },
    })
    if (user) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }
    // 注册用户
    const data = await this.prisma.user.create({
      data: createUserDto,
    })
    // 注册成功后，生成 jwt 和返回 user 信息
    return this.login({ email: data.email, password: data.password });
  }

  /**
   * 通过 token 获取用户信息
   * @param token
   * @returns
   */
  async getUser(token: string) {
    // 通过 token 获取用户信息
    try {
      const { email, key } = verifyToken(token);
      // 检查 redis 中是否存在 key
      const res = await this.redis.get(`${email}-${key}`)
      if (!res) {
        throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
      }
      return this.prisma.user.findUnique({
        where: { email },
      })
    } catch (error) {
      console.log(`token is invalid:`, error)
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    }
  }

}
