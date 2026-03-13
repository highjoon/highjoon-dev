import { type NextRequest } from 'next/server';

import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { userService } from '@/shared/server/services/user.service';

type RouteContext = { params: Promise<{ userId: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { userId } = await context.params;

  const result = await userService.findLikedPostsByUserId(userId);

  return handleServiceResponse(result);
}
