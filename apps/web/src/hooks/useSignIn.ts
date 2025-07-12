import { Nullable } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';

import { githubLoginApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';

export const useSignIn = () => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY) as Nullable<string>;

  const isSignedIn = Boolean(accessToken);

  const signIn = async () => {
    if (isSignedIn) {
      return;
    }

    const loginUrl = await githubLoginApi(window.location.href);

    if (!loginUrl) {
      return;
    }

    window.location.replace(loginUrl);
  };

  return { isSignedIn, accessToken, signIn };
};
