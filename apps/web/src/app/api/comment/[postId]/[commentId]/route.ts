import { type NextRequest } from 'next/server';

import { authenticate, verifyCommentAuthor } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { updateCommentSchema } from '@/shared/server/schemas/comment.schema';
import { commentService } from '@/shared/server/services/comment.service';

type RouteContext = { params: Promise<{ postId: string; commentId: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { commentId } = await context.params;

  const authorCheck = await verifyCommentAuthor(commentId, auth.userId);
  if ('error' in authorCheck) return authorCheck.error;

  const body = await request.json();
  const parsed = updateCommentSchema.safeParse(body);

  if (!parsed.success) {
    return handleServiceResponse({
      success: false,
      message: parsed.error.errors[0].message,
      data: null,
      statusCode: 400,
    });
  }

  const result = await commentService.updateComment(commentId, parsed.data.content);

  return handleServiceResponse(result);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { commentId } = await context.params;

  const authorCheck = await verifyCommentAuthor(commentId, auth.userId);
  if ('error' in authorCheck) return authorCheck.error;

  const result = await commentService.deleteComment(commentId);

  return handleServiceResponse(result);
}
