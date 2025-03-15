import { type CorsOptions } from 'cors';

import { env } from '@/utils/env';

const allowedOrigins = env.CORS_ORIGIN.split(',');

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
