import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../app/users/dto/create-user.dto';

/**
 * 创建用户专用的管道，检查用户是否已经存在
 */
@Injectable()
export class UniqueUserPipe implements PipeTransform {
  constructor(private prisma: PrismaService) { }
  async transform(value: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: value.email },
    });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
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
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return id;
  }
}
