import { type NextRequest } from 'next/server';

import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { postTagService } from '@/shared/server/services/postTag.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = async (request: NextRequest, context: RouteContext) => {
  const { id } = await context.params;
  const skip = parseInt(request.nextUrl.searchParams.get('skip') ?? '0', 10);
  const take = parseInt(request.nextUrl.searchParams.get('take') ?? '9', 10);

  const result = await postTagService.findPostsByTag(id, { skip, take });

  return handleServiceResponse(result);
};
