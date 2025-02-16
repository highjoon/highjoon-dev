import express, { type Router } from 'express';

import { postController } from '@/controllers/post.controller';
import { validateRequest } from '@/middlewares/validateRequest';
import { createPostSchema, updatePostSchema } from '@/schemas/post.schema';

export const postRoutes: Router = express.Router();

postRoutes.get('/', postController.getAllPosts);
postRoutes.get('/:id', postController.getPost);
postRoutes.post('/', validateRequest({ body: createPostSchema }), postController.createPost);
postRoutes.put('/:id', validateRequest({ body: updatePostSchema }), postController.updatePost);
