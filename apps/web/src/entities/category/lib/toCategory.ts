import { type CategoryResponse } from '@/entities/category/model/response';
import { type Category } from '@/entities/category/model/types';

export const toCategory = (response: CategoryResponse): Category => ({
  id: response.id,
  slug: response.slug,
  name: response.title,
  parentId: response.parentId,
});
