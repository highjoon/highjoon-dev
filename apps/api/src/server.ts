import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import requestLogger from '@/middlewares/requestLogger';
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
app.get('/', (req, res) => {
  res.send('Hello World');
});

export { app, logger };
