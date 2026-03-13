import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { commentService } from '@/shared/server/services/comment.service';

type RouteContext = { params: Promise<{ postId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { postId } = await context.params;

  const result = await commentService.findCommentsByPost(postId);

  return handleServiceResponse(result);
}
