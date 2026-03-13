import { type Post } from '@highjoon-dev/prisma';

import { postService } from '@/entities/post/services/post.service';

export const getFeaturedPostApi = async (): Promise<Post | null> => {
  const response = await postService.findFeaturedPost();

  return response.data ?? null;
};
