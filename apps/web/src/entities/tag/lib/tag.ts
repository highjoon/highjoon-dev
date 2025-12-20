import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';
import { ROUTES } from '@/shared/routes/routes';

export const createTagPath = (tagName: string) => {
  return `${ROUTES.TAGS}/${encodeURIComponent(tagName)}`;
};

export const createTagPagePath = (tagName: string, page: number = 1) => {
  return `${ROUTES.TAGS}/${encodeURIComponent(tagName)}/${page}`;
};

export const POSTS_PER_TAG_PAGE = 9;

export const findTagByName = (tags: TagWithCount[], name: string): TagWithCount | undefined => {
  return tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
};

export const sortTagsByPopularity = (tags: TagWithCount[]): TagWithCount[] => {
  return [...tags].sort((a, b) => {
    const countDiff = b._count.postTags - a._count.postTags;
    if (countDiff !== 0) return countDiff;
    return a.name.localeCompare(b.name);
  });
};
