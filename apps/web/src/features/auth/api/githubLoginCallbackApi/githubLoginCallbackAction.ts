'use server';

import { GithubLoginCallbackRequestDto } from '@/features/auth/api/githubLoginCallbackApi/dto';
import { authService } from '@/shared/server/services/auth.service';

export const githubLoginCallbackAction = async (params: GithubLoginCallbackRequestDto) => {
  const result = await authService.generateAccessToken(params.code);

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
};
