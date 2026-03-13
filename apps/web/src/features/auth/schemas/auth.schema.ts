import { z } from 'zod';

export const authorizeGithubQuerySchema = z.object({
  returnUrl: z.string().url({ message: 'returnUrl은 유효한 URL이어야 합니다.' }).optional(),
});

export const authorizeGithubCallbackQuerySchema = z.object({
  code: z.string().min(1, { message: 'code가 없습니다.' }),
});
