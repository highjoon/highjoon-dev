import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/shared/server/models/serviceResponse';

export const handleInternalError = (error: unknown, message: string) => {
  const errorMessage = `${message}: ${(error as Error).message}`;
  console.error(errorMessage);

  return ServiceResponse.failure('서버 내부 오류가 발생했습니다.', null, StatusCodes.INTERNAL_SERVER_ERROR);
};
