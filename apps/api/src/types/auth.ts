import { type Request } from 'express';

export interface JwtPayload {
  userId: number;
}

export interface AuthenticatedRequest extends Request {
  userId?: JwtPayload['userId'];
}
