import { v4 as uuid } from 'uuid';

import { ServiceResponse } from '@/models/servicesResponse';
import { userService } from '@/services/user/user.service';
import { type GithubUserData } from '@/types/user';
import { env } from '@/utils/env';
import { signToken } from '@/utils/jwt';

class AuthService {
  getGithubAuthUrl = (returnUrl?: string) => {
    const config = {
      client_id: env.GITHUB_CLIENT_ID,
      scope: 'read:user',
    };

    const url = new URL('https://github.com/login/oauth/authorize');
    url.search = new URLSearchParams(config).toString();

    if (!!returnUrl) {
      url.searchParams.append('state', returnUrl);
    }

    return ServiceResponse.success('성공했습니다', url.toString());
  };

  public generateAccessToken = async (code: string) => {
    const githubAccessToken = await this.getGithubAccessToken(code);
    const githubUserData = await this.getGithubUserData(githubAccessToken);

    const isAdmin = githubUserData.id === env.ADMIN_GITHUB_ID;

    const userData = await userService.findOrCreateUser({
      id: uuid(),
      name: githubUserData.name,
      homeUrl: githubUserData.html_url,
      avatarUrl: githubUserData.avatar_url,
      role: isAdmin ? 'ADMIN' : 'USER',
    });

    const accessToken = signToken({ userId: userData.id, role: userData.role });

    return ServiceResponse.success('성공했습니다.', { accessToken });
  };

  private getGithubAccessToken = async (code: string) => {
    const config = {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code as string,
    };

    const accessTokenUrl = new URL('https://github.com/login/oauth/access_token');
    accessTokenUrl.search = new URLSearchParams(config).toString();

    try {
      const response = await fetch(accessTokenUrl.toString(), {
        method: 'POST',
        headers: { Accept: 'application/json' },
      });
      const data = await response.json();
      const { access_token } = data;

      if (!access_token) {
        throw new Error('Access token not found');
      }

      return access_token;
    } catch {
      throw new Error('Access Token 조회에 실패했습니다.');
    }
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
