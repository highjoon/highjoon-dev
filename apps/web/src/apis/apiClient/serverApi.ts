import { cookies } from 'next/headers';

import { createApiClient } from '@/apis/apiClient';
import { ACCESS_TOKEN_KEY } from '@/constants';

export const serverApi = createApiClient({
  getAccessToken: () => cookies().get(ACCESS_TOKEN_KEY)?.value,
});
