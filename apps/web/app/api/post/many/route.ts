import { type NextRequest } from 'next/server';

import { postService } from '@/entities/post/services/post.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = await postService.createManyPosts(body);

  return handleServiceResponse(result);
};
