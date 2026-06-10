import { ServiceResponseInterface } from '@highjoon-dev/types';

import { type Category } from '@/entities/category/model/types';

export type CategoryWithChildren = Category & { children: Category[] };

export type CategoryTree = CategoryWithChildren[];

export type GetAllCategoriesResponseDto = ServiceResponseInterface<CategoryTree>;
