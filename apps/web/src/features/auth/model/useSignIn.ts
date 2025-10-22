import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nullable } from '@highjoon-dev/types';
import { deleteCookie, getCookie } from 'cookies-next/client';

import { githubLoginAction } from '@/features/auth/api/githubLoginApi/githubLoginAction';
import { ACCESS_TOKEN_KEY } from '@/features/auth/model/constants';
import { ROUTES } from '@/shared/routes/routes';

export const useSignIn = () => {
  const router = useRouter();

  const accessToken = getCookie(ACCESS_TOKEN_KEY) as Nullable<string>;

  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  const signIn = async () => {
    if (isSignedIn) {
      return;
    }

    const response = await githubLoginAction({ returnUrl: window.location.href });
    const loginUrl = response;

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
