import { Category } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export type CategoryWithChildren = Category & { children: Category[] };

export type CategoryTree = CategoryWithChildren[];

export type GetAllCategoriesResponseDto = ServiceResponseInterface<CategoryTree>;
