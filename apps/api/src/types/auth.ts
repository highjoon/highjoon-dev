import { type UserData } from '@highjoon-dev/types';
import { type Request } from 'express';

export interface JwtPayload {
  userId: UserData['id'];
  role: UserData['role'];
}

export interface AuthenticatedRequest extends Request {
  userId?: JwtPayload['userId'];
}
