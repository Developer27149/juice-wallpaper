import { Body, Controller, Get, Post } from '@nestjs/common';
import { WallpapersService } from './wallpapers.service';

@Controller('wallpapers')
export class WallpapersController {
  constructor(private readonly wallpaperService: WallpapersService) {}

  @Get()
  getWallpapers() {
    return this.wallpaperService.getWallpapers();
  }

  @Post()
  addWallpaper() {
    return this.wallpaperService.addWallpaper();
  }

  @Post('reset')
  resetWallpapers() {
    return this.wallpaperService.resetWallpapers();
  }

  @Post('delete')
  deleteWallpaper(@Body() body: { id: string }) {
    const id = body.id;
    return this.wallpaperService.deleteWallpaper(id);
  }
}
