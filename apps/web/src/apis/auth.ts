import { type ServiceResponseInterface } from '@highjoon-dev/types';

export const githubLoginApi = async (returnUrl: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/github?returnUrl=${returnUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ServiceResponseInterface<string> = await response.json();

    return data.data;
  } catch {
    /* empty */
  }
};

export const githubLoginCallbackApi = async (code: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/github/callback?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ServiceResponseInterface<{ accessToken: string }> = await response.json();

    return data.data.accessToken;
  } catch {
    /* empty */
  }
};
