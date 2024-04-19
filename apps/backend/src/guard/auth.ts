import { verifyToken } from "@juice-wallpaper/utils";
import { DEFAULT_REDIS_NAMESPACE, RedisService } from '@liaoliaots/nestjs-redis';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import Redis from 'ioredis';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE);
  }

  async canActivate(context: ExecutionContext) {
    // 获取请求对象，检查是否已经通过身份验证
    const request: Request = context.switchToHttp().getRequest();
    const { cookies } = request
    if (cookies?.['token']) {
      try {
        const { email, key } = verifyToken(cookies['token'])
        // 校验 redis 中是否存在 key
        const record = await this.redis.get(`${email}-${key}`)
        return !!record
      } catch (_) {
        throw new UnauthorizedException('Unauthorized - invalid token')
      }
    }
    return false
  }
}
