import { type CategoryRef, type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { type CategoryRefResponse, type ParentRefResponse, type PostResponse } from '@/entities/post/model/response';

const toParentRef = (parent: ParentRefResponse | null): CategoryRef['parent'] => {
  if (!parent) {
    return null;
  }

  return { id: parent.id, slug: parent.slug, name: parent.title };
};

const toCategoryRef = (category: CategoryRefResponse | null): CategoryRef | null => {
  if (!category) {
    return null;
  }

  return {
    id: category.id,
    slug: category.slug,
    name: category.title,
    parentId: category.parent?.id ?? null,
    parent: toParentRef(category.parent),
  };
};

export const toPostWithTags = (response: PostResponse): PostWithTags => ({
  id: response.id,
  slug: response.slug,
  title: response.title,
  description: response.description,
  contentUrl: response.contentUrl,
  bannerImageUrl: response.bannerImageUrl,
  publishedAt: response.publishedAt,
  createdAt: response.createdAt,
  updatedAt: response.updatedAt,
  viewCount: response.viewCount,
  postTags: response.tags.map((tag) => ({ tagId: tag.id, tag: { id: tag.id, name: tag.name } })),
  categoryRef: toCategoryRef(response.category),
});
