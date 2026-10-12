import { type CategoryWithParent } from '@/entities/category/api/getCategoryApi/dto';
import { toCategory } from '@/entities/category/lib/toCategory';
import { type CategoryResponse } from '@/entities/category/model/response';
import { type Category } from '@/entities/category/model/types';
import { fetchApi } from '@/shared/api/fetchApi';

export const getCategoryApi = async (slug: Category['slug']): Promise<CategoryWithParent | null> => {
  const categories = await fetchApi<CategoryResponse[]>('/categories');

  if (!categories) {
    return null;
  }

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  const parent = categories.find((item) => item.id === category.parentId);

  if (!parent) {
    return { ...toCategory(category), parent: null };
  }

  return { ...toCategory(category), parent: toCategory(parent) };
};
