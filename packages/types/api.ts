export interface ServiceResponseInterface<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
  readonly statusCode: number;
}

// 페이지네이션 메타데이터
export interface PaginationMeta {
  total: number;
  skip: number;
  take: number;
  hasMore: boolean;
}
