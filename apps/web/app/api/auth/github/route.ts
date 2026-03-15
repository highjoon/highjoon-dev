import { type NextRequest } from 'next/server';

import { authService } from '@/features/auth/services/auth.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

export const GET = (request: NextRequest) => {
  const returnUrl = request.nextUrl.searchParams.get('returnUrl') ?? undefined;

  const result = authService.getGithubAuthUrl(returnUrl);

  return handleServiceResponse(result);
};
