import { verifyToken } from "@juice-wallpaper/utils";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // 获取请求对象，检查是否已经通过身份验证
    const request: Request = context.switchToHttp().getRequest();
    const { cookies } = request
    if (cookies?.['token']) {
      try {
        verifyToken(cookies['token'])
        return true
      } catch (_) {
        throw new UnauthorizedException('Unauthorized - invalid token')
      }
    }
    return false
  }
}
