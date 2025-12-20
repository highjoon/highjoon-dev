import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import errorHandler from '@/middlewares/errorHandler';
import requestLogger from '@/middlewares/requestLogger';
import { authRoutes } from '@/routes/auth.routes';
import commentRoutes from '@/routes/comment.routes';
import { postRoutes } from '@/routes/post.routes';
import { tagRoutes } from '@/routes/tag.routes';
import { userRoutes } from '@/routes/user.routes';
import { corsOptions } from '@/utils/corsOptions';

const logger = pino({ name: 'server start' });
const app = express();

app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());

// Request logging
app.use(requestLogger);

// Routes
app.use('/post', postRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);
app.use('/tag', tagRoutes);

// Error handlers
app.use(errorHandler());

export { app, logger };
