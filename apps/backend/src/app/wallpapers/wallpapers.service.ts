import { Injectable } from '@nestjs/common';
import type { Wallpaper } from '@juice-wallpaper/types';
const unsplashRandomWallpaperUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

const wallpapers: Wallpaper[] = [];

@Injectable()
export class WallpapersService {
  getWallpapers() {
    return wallpapers;
  }

  async addWallpaper() {
    const res = await fetch(unsplashRandomWallpaperUrl);
    const wallpaper = await res.json();
    wallpapers.push(wallpaper);
    return wallpaper;
  }

  resetWallpapers() {
    wallpapers.length = 0;
    return [];
  }

  deleteWallpaper(id: string) {
    const index = wallpapers.findIndex((wallpaper) => wallpaper.id === id);
    if (index === -1) {
      return null;
    }
    return wallpapers.splice(index, 1);
  }
}
