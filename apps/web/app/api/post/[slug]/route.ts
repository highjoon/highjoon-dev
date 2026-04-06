import { type NextRequest } from 'next/server';

import { postService } from '@/entities/post/services/post.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const GET = async (_request: NextRequest, context: RouteContext) => {
  const { slug } = await context.params;
  const result = await postService.findPost(slug);

  return handleServiceResponse(result);
};

export const PUT = async (request: NextRequest, context: RouteContext) => {
  const { slug: id } = await context.params;
  const body = await request.json();
  const result = await postService.updatePost({ id, data: body });

  return handleServiceResponse(result);
};
