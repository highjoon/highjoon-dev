import { type CategoryResponse } from '@/entities/category/model/response';

export const categoryResponses: CategoryResponse[] = [
  { id: 'c-parent', title: 'Frontend', slug: 'frontend', parentId: null, createdAt: '2026-01-01T00:00:00Z' },
  { id: 'c-child', title: 'React', slug: 'react', parentId: 'c-parent', createdAt: '2026-01-02T00:00:00Z' },
  { id: 'c-ko', title: '프론트 엔드', slug: '프론트 엔드', parentId: null, createdAt: '2026-01-03T00:00:00Z' },
];
