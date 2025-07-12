import { Router } from 'express';

import { commentController } from '@/controllers/comment.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { createCommentSchema } from '@/schemas/comment.schema';

const router = Router();

router.post('/', authenticate, validateRequest({ body: createCommentSchema }), commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);

export default router;
