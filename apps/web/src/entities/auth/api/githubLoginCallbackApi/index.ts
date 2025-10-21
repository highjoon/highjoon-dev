import {
  GithubLoginCallbackApiResponseDto,
  GithubLoginCallbackRequestDto,
} from '@/entities/auth/api/githubLoginCallbackApi/dto';
import { ApiClient } from '@/shared/api';

export const githubLoginCallbackApi = async (api: ApiClient, params: GithubLoginCallbackRequestDto) => {
  const response = await api.get<GithubLoginCallbackApiResponseDto>(`/auth/github/callback?code=${params.code}`);

  return response.data;
};
