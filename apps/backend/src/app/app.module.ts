import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallpapersController } from './wallpapers/wallpapers.controller';
import { WallpapersService } from './wallpapers/wallpapers.service';

@Module({
  imports: [],
  controllers: [AppController, WallpapersController],
  providers: [AppService, WallpapersService],
})
export class AppModule {}
