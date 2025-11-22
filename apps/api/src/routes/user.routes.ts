import express, { type Router } from 'express';

import { userController } from '@/controllers/user.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { getLikedPostsByUserIdParamsSchema } from '@/schemas/user.schema';

export const userRoutes: Router = express.Router();

userRoutes.get(
  '/:userId/liked-posts',
  authenticate,
  validateRequest({ params: getLikedPostsByUserIdParamsSchema }),
  userController.getLikedPostsByUserId,
);
