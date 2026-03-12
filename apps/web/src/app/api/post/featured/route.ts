import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { postService } from '@/shared/server/services/post.service';

export const GET = async () => {
  const result = await postService.findFeaturedPost();

  return handleServiceResponse(result);
};
