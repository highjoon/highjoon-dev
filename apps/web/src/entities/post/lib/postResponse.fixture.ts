import { type PostResponse } from '@/entities/post/model/response';

export const createPostResponse = (overrides: Partial<PostResponse> = {}): PostResponse => ({
  id: '11111111-1111-1111-1111-111111111111',
  slug: 'hello-world',
  title: 'Hello World',
  description: '첫 글',
  contentUrl: 'https://cdn.example.com/hello-world.md',
  bannerImageUrl: 'https://cdn.example.com/hello-world.png',
  publishedAt: '2026-03-10T12:00:00Z',
  viewCount: 7,
  category: {
    id: 'c-child',
    slug: 'react',
    title: 'React',
    parent: { id: 'c-parent', slug: 'frontend', title: 'Frontend' },
  },
  tags: [
    { id: 't-1', name: 'next' },
    { id: 't-2', name: 'react' },
  ],
  createdAt: '2026-03-10T12:00:00Z',
  updatedAt: '2026-03-11T12:00:00Z',
  ...overrides,
});
