import express, { type Router } from 'express';

import { postController } from '@/controllers/post.controller';

export const postRouter: Router = express.Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:id', postController.getPost);
postRouter.post('/:id', postController.createPost);
postRouter.put('/:id', postController.updatePost);
