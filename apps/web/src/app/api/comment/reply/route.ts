import { type NextRequest } from 'next/server';

import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { createReplySchema } from '@/shared/server/schemas/comment.schema';
import { commentService } from '@/shared/server/services/comment.service';

export async function POST(request: NextRequest) {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const body = await request.json();
  const parsed = createReplySchema.safeParse(body);

  if (!parsed.success) {
    return handleServiceResponse({
      success: false,
      message: parsed.error.errors[0].message,
      data: null,
      statusCode: 400,
    });
  }

  const result = await commentService.createReply({
    ...parsed.data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return handleServiceResponse(result);
}
