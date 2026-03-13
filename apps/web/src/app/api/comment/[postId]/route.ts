import { commentService } from '@/entities/comment/services/comment.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

type RouteContext = { params: Promise<{ postId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { postId } = await context.params;

  const result = await commentService.findCommentsByPost(postId);

  return handleServiceResponse(result);
}
