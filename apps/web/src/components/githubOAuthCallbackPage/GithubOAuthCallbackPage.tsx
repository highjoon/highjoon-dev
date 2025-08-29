'use client';

import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next/client';

import { githubLoginCallbackApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { ROUTES } from '@/constants/routes';

const GithubOAuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const handleGithubCallback = useCallback(async () => {
    if (!code || !state) {
      router.replace(ROUTES.HOME);

      return;
    }

    const accessToken = await githubLoginCallbackApi(code);
    setCookie(ACCESS_TOKEN_KEY, accessToken);
    router.replace(state);
  }, [code, router, state]);

  useEffect(() => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    if (accessToken) {
      router.replace(state || ROUTES.HOME);
    } else {
      handleGithubCallback();
    }
  }, [handleGithubCallback, router, searchParams, state]);

  return null;
};

export default GithubOAuthCallbackPage;
