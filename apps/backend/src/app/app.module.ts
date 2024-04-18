import { Module } from '@nestjs/common';

import { RedisModule } from 'nestjs-redis';
import { PrismaService } from '../../prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { WallpapersController } from './wallpapers/wallpapers.controller';
import { WallpapersService } from './wallpapers/wallpapers.service';

@Module({
  imports: [
    RedisModule.forRootAsync({

    }),
    UsersModule],
  controllers: [
    AppController,
    WallpapersController,
    UsersController,
    AuthController,
  ],
  providers: [
    AppService,
    WallpapersService,
    UsersService,
    PrismaService,
    AuthService,
  ],
})
export class AppModule {}
