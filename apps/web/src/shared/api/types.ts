export interface ApiErrorBody {
  code: string;
  message: string;
  details: string[];
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorBody;
  timestamp: string;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PagedModel<T> {
  content: T[];
  page: PageInfo;
}
