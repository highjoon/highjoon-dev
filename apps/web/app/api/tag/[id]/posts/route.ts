import { type NextRequest } from 'next/server';

import { postTagService } from '@/entities/tag/services/postTag.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = async (request: NextRequest, context: RouteContext) => {
  const { id } = await context.params;
  const offset = parseInt(request.nextUrl.searchParams.get('offset') ?? '0', 10);
  const limit = parseInt(request.nextUrl.searchParams.get('limit') ?? '9', 10);

  const result = await postTagService.findPostsByTag(id, { offset, limit });

  return handleServiceResponse(result);
};
