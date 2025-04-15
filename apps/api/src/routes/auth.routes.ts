import express, { type Router } from 'express';

import { authController } from '@/controllers/auth.controller';

export const authRoutes: Router = express.Router();

authRoutes.get('/github', authController.authorizeGithub);
authRoutes.get('/github/callback', authController.authorizeGithubCallback);
