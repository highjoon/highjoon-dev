'use client';

import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next/client';

import { githubLoginCallbackApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';

const GithubOAuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGithubCallback = useCallback(async () => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      return;
    }

    const accessToken = await githubLoginCallbackApi(code);
    setCookie(ACCESS_TOKEN_KEY, accessToken);
    router.replace(state);
  }, [router, searchParams]);

  useEffect(() => {
    handleGithubCallback();
  }, [handleGithubCallback]);

  return null;
};

export default GithubOAuthCallbackPage;
