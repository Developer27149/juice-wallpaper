import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email } });
    await prisma.$disconnect();
    return !user; // 如果用户不存在，那么 email 是唯一的
  }
}

//  @IsUniqueEmail() 装饰器接受一个可选的参数，这个参数是 class-validator 的 ValidationOptions 类型。
//  验证用户是否存在（不推荐使用，会创建新的客户端示例，请使用 pipe 在验证器验证之前校验数据）
export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
  };
}
