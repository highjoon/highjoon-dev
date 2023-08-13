import getRecentPosts from '../getRecentPosts';

import { Post } from '@/services/types/post';

describe('getRecentPosts', () => {
  const posts = [
    {
      fileName: 'post-1',
      title: 'Post 1',
      description: 'Description 1',
      date: '2023-08-01',
      bannerImg: 'img-banner-1.png',
    },
    {
      fileName: 'post-2',
      title: 'Post 2',
      description: 'Description 2',
      date: '2023-08-02',
      bannerImg: 'img-banner-2.png',
    },
    {
      fileName: 'post-3',
      title: 'Post 3',
      description: 'Description 3',
      date: '2023-08-03',
      bannerImg: 'img-banner-3.png',
    },
  ] as unknown as Post[];

  it('가장 최근 포스트를 올바르게 반환해야 합니다.', () => {
    const count = 2;
    const recentPosts = getRecentPosts(posts, count);

    expect(recentPosts).toHaveLength(count);
  });

  it('가장 최근 포스트를 올바른 순서로 반환해야 합니다.', () => {
    const count = 2;
    const recentPosts = getRecentPosts(posts, count);

    expect(recentPosts[0].date).toEqual('2023-08-03');
    expect(recentPosts[1].date).toEqual('2023-08-02');
  });

  it('count가 0일 때 빈 배열을 반환해야 합니다.', () => {
    const count = 0;
    const recentPosts = getRecentPosts(posts, count);

    expect(recentPosts).toEqual([]);
  });
});
