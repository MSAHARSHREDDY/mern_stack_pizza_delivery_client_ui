// 'use server';
// import cookie from 'cookie';
// import { cookies } from 'next/headers';

// export default async function login(prevState: any, formdata: FormData) {
//     const email = formdata.get('email');
//     const password = formdata.get('password');

    
//     // todo: do request data validation

//     // call auth service

//     try {
//         const response = await fetch(`${process.env.BACKEND_URL_USER_LOGIN}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             console.log('error', error);
//             return {
//                 type: 'error',
//                 message: error.errors[0].msg,
//             };
//         }

//         const c = response.headers.getSetCookie();
//         console.log("accessToken and RefreshToken",c)
//         const accessToken = c.find((cookie) => cookie.includes('accessToken'));
//         const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

//         if (!accessToken || !refreshToken) {
//             return {
//                 type: 'error',
//                 message: 'No cookies were found!',
//             };
//         }

//         const parsedAccessToken = cookie.parse(accessToken);
//         const parsedRefreshToken = cookie.parse(refreshToken);

//         console.log("hello",parsedAccessToken, parsedRefreshToken);

//         cookies().set({
//             name: 'accessToken',
//             value: parsedAccessToken.accessToken,
//             expires: new Date(parsedAccessToken.expires),
//             // todo: check auth service for httpOnly parameter
//             httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
//             path: parsedAccessToken.Path,
//             domain: parsedAccessToken.Domain,
//             sameSite: parsedAccessToken.SameSite as 'strict',
//         });

//         cookies().set({
//             name: 'refreshToken',
//             value: parsedRefreshToken.refreshToken,
//             expires: new Date(parsedRefreshToken.expires),
//             // todo: check auth service for httpOnly parameter
//             httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
//             path: parsedRefreshToken.Path,
//             domain: parsedRefreshToken.Domain,
//             sameSite: parsedRefreshToken.SameSite as 'strict',
//         });

//         return {
//             type: 'success',
//             message: 'Login successful!',
//         };
//     } catch (err: any) {
//         return {
//             type: 'error',
//             message: err.message,
//         };
//     }
// }


////////////*****************************************working*********** */
// 'use server';

// import * as cookie from 'cookie';   // safer import
// import { cookies } from 'next/headers';


// export default async function login(prevState: any, formdata: FormData) {
//   const email = formdata.get('email');
//   const password = formdata.get('password');

//   try {
//     const response = await fetch(`${process.env.BACKEND_URL_USER_LOGIN}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.log('error', error);
//       return {
//         type: 'error',
//         message: error.errors?.[0]?.msg || 'Login failed',
//       };
//     }

//     // ✅ get raw cookies from response
//     const setCookies = response.headers.getSetCookie(); // string[]
//     console.log('raw cookies:', setCookies);

//     const accessTokenRaw = setCookies.find((c) => c.startsWith('accessToken='));
//     const refreshTokenRaw = setCookies.find((c) => c.startsWith('refreshToken='));

//     if (!accessTokenRaw || !refreshTokenRaw) {
//       return {
//         type: 'error',
//         message: 'No cookies were found!',
//       };
//     }

//     // ✅ only parse key=value part (ignore attributes like Path, HttpOnly)
//     //.split(';') → cuts the string into pieces wherever there’s a semicolon ;.
//     const parsedAccessToken = cookie.parse(accessTokenRaw.split(';')[0]);
//     const parsedRefreshToken = cookie.parse(refreshTokenRaw.split(';')[0]);

//     console.log('parsed tokens:', parsedAccessToken, parsedRefreshToken);

//     // ✅ set cookies in Next.js
//     const cookieStore = await cookies();
//     cookies().set({
//       name: 'accessToken',
//       value: parsedAccessToken.accessToken,
//       httpOnly: true,
//       path: '/',
//       sameSite: 'strict',
//       // expires is already managed by backend; you can also parse Expires= if needed
//     });

//     cookies().set({
//       name: 'refreshToken',
//       value: parsedRefreshToken.refreshToken,
//       httpOnly: true,
//       path: '/',
//       sameSite: 'strict',
//     });

//     return {
//       type: 'success',
//       message: 'Login successful!',
//     };
//   } catch (err: any) {
//     return {
//       type: 'error',
//       message: err.message,
//     };
//   }
// }





'use server';

import * as cookie from 'cookie'; // safer import
import { cookies } from 'next/headers';

export default async function login(prevState: any, formdata: FormData) {
  const email = formdata.get('email');
  const password = formdata.get('password');

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
    console.log('raw cookies:', setCookies);

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

    console.log('parsed tokens:', parsedAccessToken, parsedRefreshToken);

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
      message: 'Login successful!',
    };
  } catch (err: any) {
    return {
      type: 'error',
      message: err.message,
    };
  }
}
