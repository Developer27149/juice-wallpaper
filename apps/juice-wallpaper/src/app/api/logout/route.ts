import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  if (token) {
    const response = await fetch(process.env.BACKEND_URL + `/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token.value }),
    })
    if (response.status !== 200) {
      console.log(await response.json())
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    }
    cookieStore.delete('token')
    return NextResponse.json({ message: 'Logout success' });
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
