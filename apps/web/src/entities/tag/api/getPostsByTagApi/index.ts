import { type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { type GetPostsByTagParams } from '@/entities/tag/api/getPostsByTagApi/dto';
import { postTagService } from '@/entities/tag/services/postTag.service';

export const getPostsByTagApi = async (params: GetPostsByTagParams): Promise<PostWithTags[]> => {
  const { tagId, offset = 0, limit = 9 } = params;

  const response = await postTagService.findPostsByTag(tagId, { offset, limit });

  return response.data ?? [];
};
