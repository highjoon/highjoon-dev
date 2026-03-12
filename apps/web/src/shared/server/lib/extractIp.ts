import { type NextRequest } from 'next/server';

export const extractIp = (request: NextRequest) => {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
};
