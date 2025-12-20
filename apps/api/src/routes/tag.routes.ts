import express, { type Router } from 'express';

import { tagController } from '@/controllers/tag.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { createTagSchema, tagIdParamsSchema, updateTagSchema } from '@/schemas/tag.schema';

export const tagRoutes: Router = express.Router();

tagRoutes.get('/', tagController.getAllTags);
tagRoutes.get('/:id', validateRequest({ params: tagIdParamsSchema }), tagController.getTag);
tagRoutes.get('/:id/posts', validateRequest({ params: tagIdParamsSchema }), tagController.getPostsByTag);
tagRoutes.post('/', authenticate, validateRequest({ body: createTagSchema }), tagController.createTag);
tagRoutes.put(
  '/:id',
  authenticate,
  validateRequest({ params: tagIdParamsSchema, body: updateTagSchema }),
  tagController.updateTag,
);
tagRoutes.delete('/:id', authenticate, validateRequest({ params: tagIdParamsSchema }), tagController.deleteTag);
