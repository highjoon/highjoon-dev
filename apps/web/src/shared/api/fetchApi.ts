import { type ApiResult } from '@/shared/api/types';

type QueryValue = string | number | undefined;

interface FetchApiOptions {
  method?: 'GET' | 'POST';
  query?: Record<string, QueryValue>;
}

export class ApiError extends Error {
  status: number;
  code: string | null;

  constructor(status: number, code: string | null, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

const buildQuery = (query?: Record<string, QueryValue>) => {
  const pairs = Object.entries(query ?? {})
    .filter((entry): entry is [string, string | number] => entry[1] !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return pairs.length > 0 ? `?${pairs.join('&')}` : '';
};

// path 의 동적 구간은 호출부에서 encodeURIComponent 처리
export const fetchApi = async <T>(path: string, options: FetchApiOptions = {}): Promise<T | null> => {
  const { method = 'GET', query } = options;
  const response = await fetch(`${process.env.API_BASE_URL}/api/v1${path}${buildQuery(query)}`, { method });

  // 404 는 null
  if (response.status === 404) {
    return null;
  }

  const body = (await response.json().catch(() => null)) as ApiResult<T> | null;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      body?.error?.code ?? null,
      body?.error?.message ?? `API 요청 실패 (${response.status}): ${method} ${path}`,
    );
  }

  return body?.data ?? null;
};
