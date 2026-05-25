import {
  type GetCategoryPostsRequestDto,
  type GetCategoryPostsResponseData,
} from '@/entities/category/api/getCategoryPostsApi/dto';
import { categoryService } from '@/entities/category/services/category.service';

export const getCategoryPostsApi = async (
  params: GetCategoryPostsRequestDto,
): Promise<GetCategoryPostsResponseData | null> => {
  const { slug, skip = 0, take, includeChildren } = params;
  const response = await categoryService.findPostsByCategorySlug(slug, { skip, take, includeChildren });
  return (response.data as GetCategoryPostsResponseData) ?? null;
};
