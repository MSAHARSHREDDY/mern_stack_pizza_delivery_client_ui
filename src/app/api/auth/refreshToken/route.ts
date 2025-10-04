




import * as cookie from 'cookie';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookieStore.get('accessToken')?.value}`,
        Cookie: `refreshToken=${cookieStore.get('refreshToken')?.value}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { type: 'error', message: error.errors?.[0]?.msg || 'Login failed' },
        { status: 400 }
      );
    }

    const setCookies = response.headers.getSetCookie();

    const accessTokenRaw = setCookies?.find((c) => c.startsWith('accessToken='));
    const refreshTokenRaw = setCookies?.find((c) => c.startsWith('refreshToken='));

    if (!accessTokenRaw || !refreshTokenRaw) {
      return NextResponse.json({ type: 'error', message: 'No cookies were found!' }, { status: 400 });
    }

    const parsedAccessToken = cookie.parse(accessTokenRaw);
    const parsedRefreshToken = cookie.parse(refreshTokenRaw);

    if (parsedAccessToken.accessToken) {
      cookieStore.set({
        name: 'accessToken',
        value: parsedAccessToken.accessToken,
        httpOnly: true,
        path: '/',
      });
    }

    if (parsedRefreshToken.refreshToken) {
      cookieStore.set({
        name: 'refreshToken',
        value: parsedRefreshToken.refreshToken,
        httpOnly: true,
        path: '/',
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ type: 'error', message }, { status: 500 });
  }
}
