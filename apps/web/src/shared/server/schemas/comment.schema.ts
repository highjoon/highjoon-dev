import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1, '댓글 내용을 입력해주세요.'),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, '댓글 내용을 입력해주세요.'),
});

export const updateReplySchema = z.object({
  content: z.string().min(1, '댓글 내용을 입력해주세요.'),
});

export const createReplySchema = z.object({
  postId: z.string().min(1, 'postId가 필요합니다.'),
  userId: z.string().min(1, 'userId가 필요합니다.'),
  content: z
    .string()
    .min(1, 'content가 필요합니다.')
    .max(1000, 'content는 1000자를 초과할 수 없습니다.')
    .refine((val) => val.trim().length > 0, 'content는 비어있을 수 없습니다.'),
  parentId: z.string().min(1, 'parentId가 필요합니다.'),
});

export const commentParamsSchema = z.object({
  postId: z.string().min(1, 'postId가 필요합니다.'),
});

export const commentIdParamsSchema = z.object({
  commentId: z.string().min(1, 'commentId가 필요합니다.'),
});

export const parentIdParamsSchema = z.object({
  parentId: z.string().min(1, 'parentId가 필요합니다.'),
});
