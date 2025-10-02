import * as cookie from 'cookie'; // safer import
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookieStore.get('accessToken')?.value}`,
        Cookie: `refreshToken=${cookieStore.get('refreshToken')?.value}`,
      },

    });
    console.log("Response from refesher**", response)

    if (!response.ok) {
      const error = await response.json();
      console.log('error', error);
      return {
        type: 'error',
        message: error.errors?.[0]?.msg || 'Login failed',
      };
    }

    // ✅ get raw cookies from response
    const setCookies = response.headers.getSetCookie(); // string[]
    console.log('raw cookies:', setCookies);

    const accessTokenRaw = setCookies.find((c) => c.startsWith('accessToken='));
    const refreshTokenRaw = setCookies.find((c) => c.startsWith('refreshToken='));

    if (!accessTokenRaw || !refreshTokenRaw) {
      return NextResponse.json({ type: 'error', message: 'No cookies were found!' }, { status: 400 });

    }

    // ✅ only parse key=value part
    const parsedAccessToken = cookie.parse(accessTokenRaw);
    const parsedRefreshToken = cookie.parse(refreshTokenRaw);

    console.log('parsed tokens:', parsedAccessToken, parsedRefreshToken);



    // ✅ Use object form of .set()
    if (parsedAccessToken.accessToken) {
      cookieStore.set({
        name: 'accessToken',
        value: parsedAccessToken.accessToken,
        expires: parsedAccessToken.expires ? new Date(parsedAccessToken.expires) : undefined,
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
        path: parsedAccessToken.Path || '/',
        domain: parsedAccessToken.Domain,
        sameSite: (parsedAccessToken.SameSite as 'strict' | 'lax' | 'none') || 'strict',
      });
    }

    if (parsedRefreshToken.refreshToken) {
      cookieStore.set({
        name: 'refreshToken',
        value: parsedRefreshToken.refreshToken,
        expires: parsedRefreshToken.expires ? new Date(parsedRefreshToken.expires) : undefined,
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path || '/',
        domain: parsedRefreshToken.Domain,
        sameSite: (parsedRefreshToken.SameSite as 'strict' | 'lax' | 'none') || 'strict',
      });
    }

    return NextResponse.json({ success: true });

  }
  catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ type: 'error', message }, { status: 500 });

  }
}
