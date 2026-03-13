import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { commentService } from '@/shared/server/services/comment.service';

type RouteContext = { params: Promise<{ parentId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { parentId } = await context.params;

  const result = await commentService.findRepliesByComment(parentId);

  return handleServiceResponse(result);
}
