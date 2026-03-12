import { z } from 'zod';

export const userSchema = z.object({
  userId: z.string().min(1, { message: '유효하지 않은 사용자입니다.' }),
});

export const getLikedPostsByUserIdParamsSchema = userSchema.pick({ userId: true });
