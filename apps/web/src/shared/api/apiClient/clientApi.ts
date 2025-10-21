import { getCookie } from 'cookies-next/client';

import { ACCESS_TOKEN_KEY } from '@/entities/auth/lib/constants';

import { createApiClient } from './index';

export const clientApi = createApiClient({
  getAccessToken: () => getCookie(ACCESS_TOKEN_KEY),
});
