import { type NextRequest } from 'next/server';

import { extractIp } from '@/shared/server/lib/extractIp';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { postService } from '@/shared/server/services/post.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const PUT = async (request: NextRequest, context: RouteContext) => {
  const { slug } = await context.params;
  const ip = extractIp(request);

  const result = await postService.increaseViewCount(slug, ip);

  return handleServiceResponse(result);
};
