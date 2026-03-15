import { type NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';

import { authService } from '@/features/auth/services/auth.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return handleServiceResponse(ServiceResponse.failure('code가 없습니다.', null, StatusCodes.BAD_REQUEST));
  }

  const result = await authService.generateAccessToken(code);

  return handleServiceResponse(result);
};
