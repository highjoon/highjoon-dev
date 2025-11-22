import express, { type Router } from 'express';

import { postController } from '@/controllers/post.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import {
  createManyPostsSchema,
  createPostSchema,
  getPostSchema,
  increaseViewCountParamsSchema,
  likePostBodySchema,
  likePostParamsSchema,
  unlikePostBodySchema,
  unlikePostParamsSchema,
  updatePostParamsSchema,
  updatePostSchema,
} from '@/schemas/post.schema';

export const postRoutes: Router = express.Router();

postRoutes.get('/', postController.getAllPosts);
postRoutes.get('/featured', postController.getFeaturedPost);
postRoutes.get('/:slug', validateRequest({ params: getPostSchema }), postController.getPost);
postRoutes.post('/', authenticate, validateRequest({ body: createPostSchema }), postController.createPost);
postRoutes.post(
  '/many',
  authenticate,
  validateRequest({ body: createManyPostsSchema }),
  postController.createManyPosts,
);
postRoutes.put(
  '/:slug/view',
  validateRequest({ params: increaseViewCountParamsSchema }),
  postController.increaseViewCount,
);
postRoutes.put(
  '/:id',
  authenticate,
  validateRequest({ params: updatePostParamsSchema, body: updatePostSchema }),
  postController.updatePost,
);
postRoutes.post(
  '/:postId/like',
  authenticate,
  validateRequest({ params: likePostParamsSchema, body: likePostBodySchema }),
  postController.likePost,
);
postRoutes.post(
  '/:postId/unlike',
  authenticate,
  validateRequest({ params: unlikePostParamsSchema, body: unlikePostBodySchema }),
  postController.unlikePost,
);
