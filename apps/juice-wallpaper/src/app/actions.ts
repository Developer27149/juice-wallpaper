'use server';

import { revalidateTag } from 'next/cache';

export async function getWallpapers(): Promise<{ id: number; name: string }[]> {
  const res = await fetch(process.env.BACKEND_URL + '/api/wallpapers', {
    next: {
      tags: ['wallpapers'],
    },
  });
  return await res.json();
}

export async function addWallpaper() {
  const res = await fetch(process.env.BACKEND_URL + '/api/wallpapers', {
    method: 'POST',
  });
  revalidateTag('wallpapers');

  return await res.json();
}

export async function resetWallpapers() {
  const res = await fetch(process.env.BACKEND_URL + '/api/wallpapers/reset', {
    method: 'POST',
  });
  return await res.json();
}

export async function deleteWallpaper(id: string) {
  const res = await fetch(process.env.BACKEND_URL + '/api/wallpapers/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return await res.json();
}
