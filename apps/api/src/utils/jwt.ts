import jwt from 'jsonwebtoken';

import { type JwtPayload } from '@/types/auth';
import { env } from '@/utils/env';

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
