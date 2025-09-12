/**
 * API 클라이언트 설정 옵션
 */
export type ApiClientInit = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string>;
  json?: unknown;
  next?: { revalidate?: number | false; tags?: string[] };
  cache?: RequestCache;
};

/**
 * API 클라이언트 인터페이스
 */
export type ApiClient = {
  get<T>(path: string, init?: ApiClientInit): Promise<T>;
  post<T>(path: string, init?: ApiClientInit): Promise<T>;
  put<T>(path: string, init?: ApiClientInit): Promise<T>;
  patch<T>(path: string, init?: ApiClientInit): Promise<T>;
  del<T>(path: string, init?: ApiClientInit): Promise<T>;
};

/**
 * API 에러 타입
 */
export type ApiClientError = Error & {
  status: number;
  detail?: unknown;
};

/**
 * API 클라이언트 컨텍스트
 */
export type Ctx = {
  getAccessToken: () => string | undefined | Promise<string | undefined>;
  defaultHeaders?: Record<string, string>;
};
