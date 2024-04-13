import { IsUniqueEmail } from '../../../validators/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @IsOptional()
  @ApiProperty({
    default: 'Mr.X',
  })
  bio: string;

  @IsOptional()
  @ApiPropertyOptional()
  avatar: string;
}
