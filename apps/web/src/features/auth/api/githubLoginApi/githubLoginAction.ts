'use server';

import { GithubLoginRequestDto } from '@/features/auth/api/githubLoginApi/dto';
import { authService } from '@/shared/server/services/auth.service';

export const githubLoginAction = async (params: GithubLoginRequestDto) => {
  const result = authService.getGithubAuthUrl(params.returnUrl);

  return result.data;
};
