import { type NextRequest } from 'next/server';

import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { createCommentSchema } from '@/shared/server/schemas/comment.schema';
import { commentService } from '@/shared/server/services/comment.service';

export async function POST(request: NextRequest) {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const body = await request.json();
  const parsed = createCommentSchema.safeParse(body);

  if (!parsed.success) {
    return handleServiceResponse({
      success: false,
      message: parsed.error.errors[0].message,
      data: null,
      statusCode: 400,
    });
  }

  const result = await commentService.createComment({
    ...parsed.data,
    userId: auth.userId,
  } as Parameters<typeof commentService.createComment>[0]);

  return handleServiceResponse(result);
}
