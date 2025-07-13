import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nullable } from '@highjoon-dev/types';
import { deleteCookie, getCookie } from 'cookies-next/client';

import { githubLoginApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';

export const useSignIn = () => {
  const router = useRouter();

  const accessToken = getCookie(ACCESS_TOKEN_KEY) as Nullable<string>;

  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  const signIn = async () => {
    if (isSignedIn) {
      return;
    }

    const loginUrl = await githubLoginApi(window.location.href);

    if (!loginUrl) {
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
