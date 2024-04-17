import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserExistsPipe } from '../../pipes/index';
import { AuthGuard } from '../../guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('page', ParseIntPipe) page = 1, @Query('limit', ParseIntPipe) limit = 10) {
    return this.usersService.findMany(page, limit)
  }

  @Get(':id')
  @UsePipes(UserExistsPipe)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(UserExistsPipe)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(UserExistsPipe)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
