import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallpapersController } from './wallpapers/wallpapers.controller';
import { WallpapersService } from './wallpapers/wallpapers.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UsersModule],
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
