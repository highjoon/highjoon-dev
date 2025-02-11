import express, { type Router } from 'express';

import { postController } from '@/controllers/post.controller';

export const postRouter: Router = express.Router();

postRouter.get('/', postController.getPosts);
