import { type NextFunction, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { type AuthenticatedRequest } from '@/types/auth';
import { handleServiceResponse } from '@/utils/httpHandlers';
import { verifyToken } from '@/utils/jwt';

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    const serviceResponse = ServiceResponse.failure('인증 토큰이 누락되었습니다.', null, statusCode);
    handleServiceResponse(serviceResponse, res);

    return;
  }

  const token = authHeader?.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    const statusCode = StatusCodes.UNAUTHORIZED;
    const serviceResponse = ServiceResponse.failure('유효하지 않은 토큰입니다.', null, statusCode);

    handleServiceResponse(serviceResponse, res);
  }
};
