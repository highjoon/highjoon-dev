import { type NextRequest } from 'next/server';

import { postLikeService } from '@/entities/post/services/postLike.service';
import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const POST = async (request: NextRequest, context: RouteContext) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { slug: postId } = await context.params;
  const { userId } = await request.json();

  const result = await postLikeService.unlikePost(userId, postId);

  return handleServiceResponse(result);
};
