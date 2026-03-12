import { type NextRequest } from 'next/server';

import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { postService } from '@/shared/server/services/post.service';

export const POST = async (request: NextRequest) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const body = await request.json();
  const result = await postService.createManyPosts(body);

  return handleServiceResponse(result);
};
