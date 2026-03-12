import jwt from 'jsonwebtoken';

import { type JwtPayload } from '@/shared/server/lib/auth';

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};
