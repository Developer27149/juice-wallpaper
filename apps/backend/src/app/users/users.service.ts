import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // user can only update their own details

    // user should exist before updating
    if (!this.prisma.user.findUnique({ where: { id } })) {
      throw new Error('User does not exist');
    }
    return this.prisma.user.update({
      where: { email: updateUserDto.email },
      data: updateUserDto,
    })
  }

  remove(id: string) {

    return this.prisma.user.delete({
      where: { id },
    });
  }

  login(loginUserDto: LoginUserDto) {
    return this.prisma.user.findUnique({
      where: loginUserDto,
    });
  }
}
