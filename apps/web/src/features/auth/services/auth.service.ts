import { type GithubUserData } from '@highjoon-dev/types';
import { v4 as uuid } from 'uuid';

import { userService } from '@/entities/user/services/user.service';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { signToken } from '@/shared/server/lib/jwt';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

class AuthService {
  public getGithubAuthUrl = (returnUrl?: string) => {
    const config = {
      client_id: process.env.GITHUB_CLIENT_ID!,
      scope: 'read:user',
    };

    const url = new URL('https://github.com/login/oauth/authorize');
    url.search = new URLSearchParams(config).toString();

    if (returnUrl) {
      url.searchParams.append('state', returnUrl);
    }

    return ServiceResponse.success('성공했습니다', url.toString());
  };

  public generateAccessToken = async (code: string) => {
    try {
      const githubAccessToken = await this.getGithubAccessToken(code);
      const githubUserData = await this.getGithubUserData(githubAccessToken);

      const isAdmin = githubUserData.id === Number(process.env.ADMIN_GITHUB_ID);
      const userData = await userService.findOrCreateUser({
        id: uuid(),
        githubId: githubUserData.id,
        name: githubUserData.name || githubUserData.login,
        homeUrl: githubUserData.html_url,
        avatarUrl: githubUserData.avatar_url,
        role: isAdmin ? 'ADMIN' : 'USER',
      });

      const accessToken = signToken({ userId: userData.id, role: userData.role });

      return ServiceResponse.success('성공했습니다.', { accessToken });
    } catch (error) {
      return handleInternalError(error, 'generateAccessToken Error');
    }
  };

  private getGithubAccessToken = async (code: string) => {
    const config = {
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    };

    const accessTokenUrl = new URL('https://github.com/login/oauth/access_token');
    accessTokenUrl.search = new URLSearchParams(config).toString();

    const response = await fetch(accessTokenUrl.toString(), {
      method: 'POST',
      headers: { Accept: 'application/json' },
    });
    const data = await response.json();
    const { access_token, error, error_description } = data;

    if (!access_token) {
      throw new Error(`GitHub OAuth 오류: ${error} - ${error_description}`);
    }

    return access_token;
  };

  private getGithubUserData = async (accessToken: string) => {
    try {
      const userDataResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const userData: GithubUserData = await userDataResponse.json();

      if (!userData) {
        throw new Error('User data not found');
      }

      return userData;
    } catch {
      throw new Error('User Data 조회에 실패했습니다.');
    }
  };
}

export const authService = new AuthService();
