'use server';

import { cookies } from 'next/headers';

export const logout = async () => {
  const cookieStore = await cookies(); // ✅ await here

  const accessToken = cookieStore.get('accessToken')?.value;//if you keep ? helps to avoid from undefined error.
  const refreshToken = cookieStore.get('refreshToken')?.value;//if you keep ? helps to avoid from undefined error.

  const response = await fetch(`${process.env.BACKEND_URL_FETCH_USER_LOGOUT}`, {
    method: 'POST',
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      cookie: refreshToken ? `refreshToken=${refreshToken}` : '',
    },
  });

  if (!response.ok) {
    console.log('Logout failed', response.status);
    return false;
  }

  // ✅ delete from cookieStore (after awaiting cookies)
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return true;
};
