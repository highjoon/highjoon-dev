import { type CorsOptions } from 'cors';

import { env } from '@/utils/env';

const whitelist = env.CORS_ORIGIN.split(',');
export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
