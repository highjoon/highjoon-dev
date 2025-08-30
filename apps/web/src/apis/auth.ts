import { type ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/types/apiClient';
import { AuthApiRequest } from '@/types/auth';

export const authApi = (api: ApiClient) => {
  return {
    /** 깃허브 로그인 */
    githubLogin: (params: AuthApiRequest['githubLogin']) =>
      api.get<ServiceResponseInterface<string>>(`/auth/github?returnUrl=${params.returnUrl}`),
    /** 깃허브 로그인 콜백 */
    githubLoginCallback: (params: AuthApiRequest['githubLoginCallback']) =>
      api.get<ServiceResponseInterface<string>>(`/auth/github/callback?code=${params.code}`),
  } as const;
};
