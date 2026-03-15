import { type NextRequest } from 'next/server';

import { postService } from '@/entities/post/services/post.service';
import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

export const GET = async (request: NextRequest) => {
  const skip = request.nextUrl.searchParams.get('skip');
  const take = request.nextUrl.searchParams.get('take');
  const limit = request.nextUrl.searchParams.get('limit');

  const result = await postService.findAllPosts({
    skip: skip ? Number(skip) : undefined,
    take: limit ? Number(limit) : take ? Number(take) : undefined,
  });

  return handleServiceResponse(result);
};

export const POST = async (request: NextRequest) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const body = await request.json();
  const result = await postService.createPost(body);

  return handleServiceResponse(result);
};
