import { type Post } from '@highjoon-dev/prisma';

import { type GetPostsByTagParams } from '@/entities/tag/api/getPostsByTagApi/dto';
import { postTagService } from '@/shared/server/services/postTag.service';

export const getPostsByTagApi = async (params: GetPostsByTagParams): Promise<Post[]> => {
  const { tagId, skip = 0, take = 9 } = params;

  const response = await postTagService.findPostsByTag(tagId, { skip, take });

  return (response.data as Post[]) ?? [];
};
