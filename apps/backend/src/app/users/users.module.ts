import { Body, Delete, Module, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
