'use server';

import { IUser } from "@juice-wallpaper/types";
import { cookies } from "next/headers";

export async function getUserInfo(): Promise<null | IUser> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (token) {
      const res = await fetch(process.env.BACKEND_URL + '/api/auth', {
        next: {
          tags: ['auth'],
        },
        cache: 'no-cache',
      });
      return await res.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log('get user info failed.', error)
    return null;
  }
}

export async function login(params: { email: string, password: string }) {
  try {
    const res = await fetch(process.env.BACKEND_URL + '/api/auth/login', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      credentials: 'omit'
    });
    console.log(res.headers.getSetCookie())
    const token = res.headers.getSetCookie().find((cookie: string) => cookie.startsWith('token='))?.split(';')[0].replace('token=', '') ?? '';
    const data = await res.json()
    cookies().set('token', token, { path: '/', httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
    return data;
  } catch (error) {
    console.log(`login failed:`, error)
  }
}
