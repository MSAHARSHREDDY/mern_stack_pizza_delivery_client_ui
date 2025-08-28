'use server';

import * as cookie from 'cookie'; // safer import
import { cookies } from 'next/headers';

export default async function register(prevState: any, formdata: FormData) {
 const firstName = formdata.get('firstName');
    const lastName = formdata.get('lastName');
    const email = formdata.get('email');
    const password = formdata.get('password');

  try {
    const response = await fetch(`${process.env.BACKEND_URL_FETCH_USER_REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

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
    console.log('raw cookies of register:', setCookies);

    const accessTokenRaw = setCookies.find((c) => c.startsWith('accessToken='));
    const refreshTokenRaw = setCookies.find((c) => c.startsWith('refreshToken='));

    if (!accessTokenRaw || !refreshTokenRaw) {
      return {
        type: 'error',
        message: 'No cookies were found!',
      };
    }

    // ✅ only parse key=value part
    const parsedAccessToken = cookie.parse(accessTokenRaw);
    const parsedRefreshToken = cookie.parse(refreshTokenRaw);

    console.log('parsed tokens for register:', parsedAccessToken, parsedRefreshToken);

    const cookieStore = await cookies();

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

    return {
      type: 'success',
      message: 'Regitration successful!',
    };
  } catch (err: any) {
    return {
      type: 'error',
      message: err.message,
    };
  }
}