import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next/client';

import { authApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { clientApi } from '@/shared/api';
import { ROUTES } from '@/shared/routes/routes';

/**
 * GitHub OAuth 콜백 처리를 담당하는 훅
 * @returns void
 */
export function useGithubOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const handleGithubCallback = useCallback(async () => {
    if (!code || !state) {
      notifications.show({
        title: '로그인 실패',
        message: '로그인에 필요한 정보가 누락되었습니다.',
        color: 'red',
      });
      router.replace(ROUTES.HOME);
      return;
    }

    try {
      const response = await authApi(clientApi).githubLoginCallback({ code });
      const { accessToken } = response.data;
      setCookie(ACCESS_TOKEN_KEY, accessToken);
      router.replace(state);
    } catch {
      notifications.show({
        title: '로그인 실패',
        message: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
        color: 'red',
      });
      router.replace(ROUTES.HOME);
    }
  }, [code, router, state]);

  useEffect(() => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    if (accessToken) {
      router.replace(state || ROUTES.HOME);
    } else {
      handleGithubCallback();
    }
  }, [handleGithubCallback, router, searchParams, state]);
}
