import { type Post } from '@/types/post';
import sortPostsByDate from '@/utils/sortPostsByDate';

describe('sortPostsByDate', () => {
  it('Date를 기준으로 내림차순 정렬해야 합니다.', () => {
    const posts = [{ date: '2023-08-01' }, { date: '2023-09-01' }, { date: '2021-05-23' }];
    const sortedPosts = sortPostsByDate(posts as Post[]);
    expect(sortedPosts).toEqual([{ date: '2023-09-01' }, { date: '2023-08-01' }, { date: '2021-05-23' }]);
  });
});
