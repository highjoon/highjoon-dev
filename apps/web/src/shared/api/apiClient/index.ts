/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiClient, ApiClientError, ApiClientInit, Ctx } from '../types';

/**
 * API 클라이언트 생성
 */
export const createApiClient = ({ getAccessToken, defaultHeaders }: Ctx): ApiClient => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
  }

  const run = async <T>(method: string, path: string, init?: ApiClientInit): Promise<T> => {
    const accessToken = await getAccessToken();
    const headers: Record<string, string> = {
      ...(init?.json !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(defaultHeaders ?? {}),
      ...(init?.headers ?? {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const response = await fetch(path.startsWith('http') ? path : `${baseUrl}${path}`, {
      method,
      headers,
      body: init?.json !== undefined ? JSON.stringify(init.json) : (init as any)?.body,
      next: init?.next,
      cache: init?.cache,
    });

    if (!response.ok) {
      let detail: unknown;
      try {
        detail = await response.json();
      } catch {
        /* empty */
      }

      const error = new Error(`[API] ${method} ${path} ${response.status}`) as ApiClientError;
      error.status = response.status;
      error.detail = detail;
      throw error;
    }

    const contentType = response.headers.get('Content-Type') ?? '';

    if (contentType.startsWith('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as T;
  };

  return {
    get: async <T>(path: string, init?: ApiClientInit): Promise<T> => run<T>('GET', path, init),
    post: async <T>(path: string, init?: ApiClientInit): Promise<T> => run<T>('POST', path, init),
    put: async <T>(path: string, init?: ApiClientInit): Promise<T> => run<T>('PUT', path, init),
    patch: async <T>(path: string, init?: ApiClientInit): Promise<T> => run<T>('PATCH', path, init),
    del: async <T>(path: string, init?: ApiClientInit): Promise<T> => run<T>('DELETE', path, init),
  };
};
