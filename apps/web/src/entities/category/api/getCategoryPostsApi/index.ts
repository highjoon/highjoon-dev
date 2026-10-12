import {
  type GetCategoryPostsRequestDto,
  type GetCategoryPostsResponseData,
} from '@/entities/category/api/getCategoryPostsApi/dto';
import { toCategory } from '@/entities/category/lib/toCategory';
import { type CategoryResponse } from '@/entities/category/model/response';
import { toPostWithTags } from '@/entities/post/lib/toPostWithTags';
import { type PostResponse } from '@/entities/post/model/response';
import { fetchApi } from '@/shared/api/fetchApi';
import { toPaginationMeta } from '@/shared/api/toPaginationMeta';
import { type PagedModel } from '@/shared/api/types';

const DEFAULT_TAKE = 10;

export const getCategoryPostsApi = async (
  params: GetCategoryPostsRequestDto,
): Promise<GetCategoryPostsResponseData | null> => {
  const { slug, skip = 0, take = DEFAULT_TAKE } = params;

  const [posts, categories] = await Promise.all([
    fetchApi<PagedModel<PostResponse>>('/posts', {
      query: { category: slug, page: Math.floor(skip / take), size: take },
    }),
    fetchApi<CategoryResponse[]>('/categories'),
  ]);

  const category = categories?.find((item) => item.slug === slug);

  if (!posts || !category) {
    return null;
  }

  return {
    posts: posts.content.map(toPostWithTags),
    meta: toPaginationMeta(posts.page),
    category: toCategory(category),
  };
};
