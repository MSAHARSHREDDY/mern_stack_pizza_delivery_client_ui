import { cookies } from 'next/headers';

interface Session {
  user: User;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'customer' | 'manager';
  tenant: number | null;
}

export const getSession = async (): Promise<Session | null> => {
  return await getSelf();
};

const getSelf = async (): Promise<Session | null> => {
  const cookieStore = await cookies(); // ✅ await here
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${process.env.BACKEND_URL_FETCH_USER_SELF}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return {
    user: (await response.json()) as User,
  };
};
