import { type Request } from 'express';

export const extractIp = (req: Request) => {
  return req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.ip || '';
};
