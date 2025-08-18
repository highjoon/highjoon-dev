import express, { type Router } from 'express';

import { postController } from '@/controllers/post.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { createManyPostsSchema, createPostSchema, updatePostSchema } from '@/schemas/post.schema';

export const postRoutes: Router = express.Router();

postRoutes.get('/', postController.getAllPosts);
postRoutes.get('/featured', postController.getFeaturedPost);
postRoutes.get('/:slug', postController.getPost);
postRoutes.post('/', authenticate, validateRequest({ body: createPostSchema }), postController.createPost);
postRoutes.post(
  '/many',
  authenticate,
  validateRequest({ body: createManyPostsSchema }),
  postController.createManyPosts,
);
postRoutes.put('/:slug/view', postController.increaseViewCount);
postRoutes.put('/:id', authenticate, validateRequest({ body: updatePostSchema }), postController.updatePost);
postRoutes.post('/:postId/like', authenticate, postController.likePost);
