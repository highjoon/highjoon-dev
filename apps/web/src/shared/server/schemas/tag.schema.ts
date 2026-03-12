import { z } from 'zod';

export const tagSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: 'name은 필수입니다.' }).max(50, { message: 'name은 50자 이하여야 합니다.' }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createTagSchema = tagSchema.pick({ name: true });
export const updateTagSchema = tagSchema.pick({ name: true });
export const tagIdParamsSchema = z.object({
  id: z.string().min(1, { message: '유효하지 않은 태그입니다.' }),
});
