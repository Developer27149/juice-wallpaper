import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../app/users/dto/create-user.dto';

/**
 * 创建用户专用的管道，检查用户是否已经存在
 */
@Injectable()
export class UniqueUserPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(value: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: value.email },
    });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return value;
  }
}


// 通过 id 检查用户是否存在
@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private prisma: PrismaService) { }
  async transform(id: string, metadata) {
    console.log('id', id);
    console.log('meta data:', metadata)
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return id;
  }
}
