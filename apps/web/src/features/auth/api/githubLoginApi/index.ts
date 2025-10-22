import { GithubLoginRequestDto, GithubLoginResponseDto } from '@/features/auth/api/githubLoginApi/dto';
import { ApiClient } from '@/shared/api';

export const githubLoginApi = async (api: ApiClient, params: GithubLoginRequestDto) => {
  const response = await api.get<GithubLoginResponseDto>(`/auth/github?returnUrl=${params.returnUrl}`);

  return response.data;
};
