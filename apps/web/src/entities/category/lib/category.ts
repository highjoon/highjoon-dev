import type { CategoryRef } from '@/entities/post/api/getPostApi/dto';
import { ROUTES } from '@/shared/routes/routes';

export const POSTS_PER_CATEGORY_PAGE = 6;

export const createCategoryPath = (slug: string, page: number = 1) => {
  return `${ROUTES.CATEGORIES}/${slug}/${page}`;
};

export const formatCategoryBreadcrumb = (category?: CategoryRef | null): string => {
  if (!category) return '';
  return category.parent ? `${category.parent.name} · ${category.name}` : category.name;
};
