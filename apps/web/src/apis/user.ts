import { type LikedPost, type ServiceResponseInterface } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';

import { ACCESS_TOKEN_KEY } from '@/constants';

export const getLikedPostsApi = async (userId: string) => {
  try {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/liked-posts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: ServiceResponseInterface<LikedPost[]> = await response.json();

    return data;
  } catch {}
};
