import { Router } from 'express';

import { commentController } from '@/controllers/comment.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { verifyCommentAuthor } from '@/middlewares/verifyCommentAuthor';
import { createCommentSchema } from '@/schemas/comment.schema';

const router = Router();

router.post('/', authenticate, validateRequest({ body: createCommentSchema }), commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);
router.put('/:commentId', authenticate, verifyCommentAuthor, commentController.updateComment);
router.delete('/:commentId', authenticate, verifyCommentAuthor, commentController.deleteComment);

export default router;
