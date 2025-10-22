'use server';

import { githubLoginApi } from '@/features/auth/api/githubLoginApi';
import { GithubLoginRequestDto } from '@/features/auth/api/githubLoginApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const githubLoginAction = async (params: GithubLoginRequestDto) => {
  return await githubLoginApi(serverApi, params);
};
