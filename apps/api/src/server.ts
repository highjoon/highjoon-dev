import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import errorHandler from '@/middlewares/errorHandler';
import requestLogger from '@/middlewares/requestLogger';
import { postRouter } from '@/routers/post.router';
import { env } from '@/utils/env';

const logger = pino({ name: 'server start' });
const app = express();

app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Request logging
app.use(requestLogger);

// Routes
app.use('/post', postRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
