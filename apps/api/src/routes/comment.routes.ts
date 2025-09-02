import { Router } from 'express';

import { commentController } from '@/controllers/comment.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { verifyCommentAuthor } from '@/middlewares/verifyCommentAuthor';
import {
  commentIdParamsSchema,
  commentParamsSchema,
  createCommentSchema,
  createReplySchema,
  parentIdParamsSchema,
  updateCommentSchema,
  updateReplySchema,
} from '@/schemas/comment.schema';

const router = Router();

// 대댓글
router.post('/reply', authenticate, validateRequest({ body: createReplySchema }), commentController.createReply);
router.get(
  '/replies/:parentId',
  validateRequest({ params: parentIdParamsSchema }),
  commentController.getRepliesByComment,
);
router.put(
  '/reply/:commentId',
  authenticate,
  validateRequest({ body: updateReplySchema, params: commentIdParamsSchema }),
  verifyCommentAuthor,
  commentController.updateReply,
);
router.delete(
  '/reply/:commentId',
  authenticate,
  validateRequest({ params: commentIdParamsSchema }),
  verifyCommentAuthor,
  commentController.deleteReply,
);

// 댓글
router.post('/', authenticate, validateRequest({ body: createCommentSchema }), commentController.createComment);
router.get('/:postId', validateRequest({ params: commentParamsSchema }), commentController.getCommentsByPost);
router.put(
  '/:commentId',
  authenticate,
  validateRequest({ body: updateCommentSchema, params: commentIdParamsSchema }),
  verifyCommentAuthor,
  commentController.updateComment,
);
router.delete(
  '/:commentId',
  authenticate,
  validateRequest({ params: commentIdParamsSchema }),
  verifyCommentAuthor,
  commentController.deleteComment,
);

export default router;
