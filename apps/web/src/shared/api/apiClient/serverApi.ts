import { cookies } from 'next/headers';

import { ACCESS_TOKEN_KEY } from '@/constants';

import { createApiClient } from './index';

export const serverApi = createApiClient({
  getAccessToken: () => cookies().get(ACCESS_TOKEN_KEY)?.value,
});
