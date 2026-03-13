import { postService } from '@/entities/post/services/post.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

export const GET = async () => {
  const result = await postService.findFeaturedPost();

  return handleServiceResponse(result);
};
