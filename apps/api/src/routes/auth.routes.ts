import express, { type Router } from 'express';

import { authController } from '@/controllers/auth.controller';
import { validateRequest } from '@/middlewares/validateRequest';
import { authorizeGithubCallbackQuerySchema, authorizeGithubQuerySchema } from '@/schemas/auth.schema';

export const authRoutes: Router = express.Router();

authRoutes.get('/github', validateRequest({ query: authorizeGithubQuerySchema }), authController.authorizeGithub);
authRoutes.get(
  '/github/callback',
  validateRequest({ query: authorizeGithubCallbackQuerySchema }),
  authController.authorizeGithubCallback,
);
