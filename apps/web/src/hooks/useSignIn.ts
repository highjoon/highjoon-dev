import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nullable } from '@highjoon-dev/types';
import { deleteCookie, getCookie } from 'cookies-next/client';

import { authApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { clientApi } from '@/shared/api';
import { ROUTES } from '@/shared/routes';

export const useSignIn = () => {
  const router = useRouter();

  const accessToken = getCookie(ACCESS_TOKEN_KEY) as Nullable<string>;

  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  const signIn = async () => {
    if (isSignedIn) {
      return;
    }

    const response = await authApi(clientApi).githubLogin({ returnUrl: window.location.href });
    const loginUrl = response.data;

    if (!loginUrl) {
      router.replace(ROUTES.HOME);

      return;
    }

    router.replace(loginUrl);
  };

  const signOut = () => {
    deleteCookie(ACCESS_TOKEN_KEY);
    router.refresh();
  };

  useEffect(() => {
    setIsSignedIn(Boolean(accessToken));
  }, [accessToken]);

  return { isSignedIn, accessToken, signIn, signOut };
};
