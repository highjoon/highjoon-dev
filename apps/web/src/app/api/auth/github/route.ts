import { type NextRequest } from 'next/server';

import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { authService } from '@/shared/server/services/auth.service';

export const GET = (request: NextRequest) => {
  const returnUrl = request.nextUrl.searchParams.get('returnUrl') ?? undefined;

  const result = authService.getGithubAuthUrl(returnUrl);

  return handleServiceResponse(result);
};
