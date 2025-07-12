import { cookies } from 'next/headers';

import { ACCESS_TOKEN_KEY } from '@/constants';
import { handleFetchError } from '@/utils/handleFetchError';

export const fetchServer = async (url: string, options: RequestInit = {}) => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(url, { ...options, headers });

  await handleFetchError(response);

  return response;
};
