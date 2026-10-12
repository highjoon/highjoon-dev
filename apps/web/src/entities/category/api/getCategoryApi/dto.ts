import { type Category } from '@/entities/category/model/types';

export type CategoryWithParent = Category & { parent: Category | null };
