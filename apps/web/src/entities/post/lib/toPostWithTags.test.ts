import dayjs from 'dayjs';

import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { toPostWithTags } from '@/entities/post/lib/toPostWithTags';

describe('toPostWithTags', () => {
  it('PostResponse 를 PostWithTags 로 변환한다', () => {
    expect(toPostWithTags(createPostResponse())).toEqual({
      id: '11111111-1111-1111-1111-111111111111',
      slug: 'hello-world',
      title: 'Hello World',
      description: '첫 글',
      contentUrl: 'https://cdn.example.com/hello-world.md',
      bannerImageUrl: 'https://cdn.example.com/hello-world.png',
      publishedAt: '2026-03-10T12:00:00Z',
      createdAt: '2026-03-10T12:00:00Z',
      updatedAt: '2026-03-11T12:00:00Z',
      viewCount: 7,
      postTags: [
        { tagId: 't-1', tag: { id: 't-1', name: 'next' } },
        { tagId: 't-2', tag: { id: 't-2', name: 'react' } },
      ],
      categoryRef: {
        id: 'c-child',
        slug: 'react',
        name: 'React',
        parentId: 'c-parent',
        parent: { id: 'c-parent', slug: 'frontend', name: 'Frontend' },
      },
    });
  });

  it('postTags 의 tagId 는 태그마다 서로 다르다 (React key 용)', () => {
    const { postTags } = toPostWithTags(createPostResponse());
    const tagIds = postTags!.map((postTag) => postTag.tagId);

    expect(new Set(tagIds).size).toBe(tagIds.length);
    expect(tagIds).toEqual(['t-1', 't-2']);
  });

  it('최상위 카테고리는 parentId 와 parent 가 null 이다', () => {
    const response = createPostResponse({
      category: { id: 'c-parent', slug: 'frontend', title: 'Frontend', parent: null },
    });

    expect(toPostWithTags(response).categoryRef).toEqual({
      id: 'c-parent',
      slug: 'frontend',
      name: 'Frontend',
      parentId: null,
      parent: null,
    });
  });

  it('카테고리가 없으면 categoryRef 는 null, 태그가 없으면 postTags 는 빈 배열이다', () => {
    const result = toPostWithTags(createPostResponse({ category: null, tags: [] }));

    expect(result.categoryRef).toBeNull();
    expect(result.postTags).toEqual([]);
  });

  it('날짜는 ISO 문자열 그대로 두며 new Date 와 dayjs 가 해석할 수 있다', () => {
    const result = toPostWithTags(createPostResponse());

    expect(typeof result.publishedAt).toBe('string');
    expect(typeof result.createdAt).toBe('string');
    expect(typeof result.updatedAt).toBe('string');
    expect(Number.isNaN(new Date(result.publishedAt).getTime())).toBe(false);
    expect(dayjs(result.publishedAt).isValid()).toBe(true);
  });
});
