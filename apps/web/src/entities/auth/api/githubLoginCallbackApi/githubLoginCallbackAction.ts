'use server';

import { githubLoginCallbackApi } from '@/entities/auth/api/githubLoginCallbackApi';
import { GithubLoginCallbackRequestDto } from '@/entities/auth/api/githubLoginCallbackApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const githubLoginCallbackAction = async (params: GithubLoginCallbackRequestDto) => {
  return await githubLoginCallbackApi(serverApi, params);
};
