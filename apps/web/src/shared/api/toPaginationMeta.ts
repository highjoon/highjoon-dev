import { type PaginationMeta } from '@highjoon-dev/types';

import { type PageInfo } from '@/shared/api/types';

export const toPaginationMeta = (page: PageInfo): PaginationMeta => ({
  total: page.totalElements,
  skip: page.number * page.size,
  take: page.size,
  hasMore: page.number + 1 < page.totalPages,
});
