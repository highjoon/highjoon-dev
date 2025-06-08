import express, { type Router } from 'express';

import { userController } from '@/controllers/user.controller';
import { authenticate } from '@/middlewares/authenticate';

export const userRoutes: Router = express.Router();

userRoutes.get('/:userId/liked-posts', authenticate, userController.getLikedPostsByUserId);
