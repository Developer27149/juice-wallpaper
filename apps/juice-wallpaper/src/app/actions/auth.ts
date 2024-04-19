'use server';

import { IUser } from "@juice-wallpaper/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getUserInfo(): Promise<null | IUser> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (token) {
      const res = await fetch(process.env.BACKEND_URL + `/api/auth?token=${token}`, {
        next: {
          tags: ['auth'],
        },
        cache: 'no-cache',
      });
      if (res.status !== 200) {
        return null;
      }
      return await res.json();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function login(params: { email: string, password: string }): Promise<IUser | { message?: string }> {
  const res = await fetch(process.env.BACKEND_URL + '/api/auth/login', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    credentials: 'omit'
  });
  const data = await res.json()

  console.log(res)

  if (res.status !== 200) {
    return { message: data.message }
  }
  const token = res.headers.getSetCookie().find((cookie: string) => cookie.startsWith('token='))?.split(';')[0].replace('token=', '') ?? '';
  cookies().set('token', token, { path: '/', httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
  revalidateTag('auth');
  return data;
}

