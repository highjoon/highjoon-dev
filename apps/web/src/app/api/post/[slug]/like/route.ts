import { type NextRequest } from 'next/server';

import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { postLikeService } from '@/shared/server/services/postLike.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const POST = async (request: NextRequest, context: RouteContext) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { slug: postId } = await context.params;
  const { userId } = await request.json();

  const result = await postLikeService.likePost(userId, postId);

  return handleServiceResponse(result);
};
