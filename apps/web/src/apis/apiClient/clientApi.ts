import { getCookie } from 'cookies-next/client';

import { createApiClient } from '@/apis/apiClient';
import { ACCESS_TOKEN_KEY } from '@/constants';

export const clientApi = createApiClient({
  getAccessToken: () => getCookie(ACCESS_TOKEN_KEY),
});
