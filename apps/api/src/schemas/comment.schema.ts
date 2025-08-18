import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1, '댓글 내용을 입력해주세요.'),
});
