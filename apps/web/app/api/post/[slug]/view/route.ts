import { type NextRequest } from 'next/server';

import { postService } from '@/entities/post/services/post.service';
import { extractIp } from '@/shared/server/lib/extractIp';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const PUT = async (request: NextRequest, context: RouteContext) => {
  const { slug } = await context.params;
  const ip = extractIp(request);

  const result = await postService.increaseViewCount(slug, ip);

  return handleServiceResponse(result);
};
