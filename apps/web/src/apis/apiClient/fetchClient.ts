import { getCookie } from 'cookies-next/client';

import { ACCESS_TOKEN_KEY } from '@/constants';
import { handleFetchError } from '@/utils/handleFetchError';

export const fetchClient = async (url: string, options: RequestInit = {}) => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(url, { ...options, headers });

  await handleFetchError(response);

  return response;
};
