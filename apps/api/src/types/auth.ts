import { type Request } from 'express';

import { type UserData } from '@/types/user';

export interface JwtPayload {
  userId: UserData['id'];
  role: UserData['role'];
}

export interface AuthenticatedRequest extends Request {
  userId?: JwtPayload['userId'];
}
