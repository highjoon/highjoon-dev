import { Router } from 'express';

import { commentController } from '@/controllers/comment.controller';
import { authenticate } from '@/middlewares/authenticate';
import { validateRequest } from '@/middlewares/validateRequest';
import { verifyCommentAuthor } from '@/middlewares/verifyCommentAuthor';
import { createCommentSchema } from '@/schemas/comment.schema';

const router = Router();

// 대댓글
router.post('/reply', authenticate, commentController.createReply);
router.get('/replies/:parentId', commentController.getRepliesByComment);
router.put('/reply/:replyId', authenticate, verifyCommentAuthor, commentController.updateReply);
router.delete('/reply/:replyId', authenticate, verifyCommentAuthor, commentController.deleteReply);

// 댓글
router.post('/', authenticate, validateRequest({ body: createCommentSchema }), commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);
router.put('/:commentId', authenticate, verifyCommentAuthor, commentController.updateComment);
router.delete('/:commentId', authenticate, verifyCommentAuthor, commentController.deleteComment);

export default router;
