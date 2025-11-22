import { z } from 'zod';

export const postSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, { message: 'title은 필수입니다.' }),
  slug: z.string().min(1, { message: 'slug는 필수입니다.' }),
  description: z.string().min(1, { message: 'description은 필수입니다.' }),
  contentUrl: z.string().url({ message: 'contentUrl은 유효한 URL이어야 합니다.' }),
  bannerImageUrl: z.string().url({ message: 'bannerImageUrl은 유효한 URL이어야 합니다.' }),
  publishedAt: z.preprocess(
    (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date().refine((date) => !isNaN(date.getTime()), { message: '유효한 날짜여야 합니다.' }),
  ),
  tags: z.preprocess((arg) => (Array.isArray(arg) ? arg : []), z.array(z.string()).default([])),
  category: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  viewCount: z.number().default(0),
  likeCount: z.number().default(0),
});

export const getPostSchema = postSchema.pick({ slug: true });
export const createPostSchema = postSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const createManyPostsSchema = z.array(postSchema.omit({ id: true, createdAt: true, updatedAt: true }));
export const updatePostSchema = postSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updatePostParamsSchema = z.object({ id: z.string().min(1, { message: '유효하지 않은 게시물입니다.' }) });
export const increaseViewCountParamsSchema = postSchema.pick({ slug: true });
export const likePostParamsSchema = z.object({ postId: z.string().min(1, { message: '유효하지 않은 게시물입니다.' }) });
export const likePostBodySchema = z.object({ userId: z.string().min(1, { message: '유효하지 않은 사용자입니다.' }) });
export const unlikePostParamsSchema = z.object({
  postId: z.string().min(1, { message: '유효하지 않은 게시물입니다.' }),
});
export const unlikePostBodySchema = z.object({ userId: z.string().min(1, { message: '유효하지 않은 사용자입니다.' }) });
