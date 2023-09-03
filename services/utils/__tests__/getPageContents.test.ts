import getPageContents from '../getPageContents';

import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { posts } from '@/services/data/posts';

describe('getPageContents', () => {
  it('첫 페이지일 경우 올바른 페이지 컨텐츠를 반환해야 합니다.', () => {
    const pageNumber = 1;
    const { currentPagePosts } = getPageContents(posts, pageNumber);

    expect(currentPagePosts).toEqual(posts.slice(0, DEFAULT_NUMBER_OF_POSTS_PER_PAGE));
  });

  it('중간 페이지일 경우 올바른 페이지 컨텐츠를 반환해야 합니다.', () => {
    const pageNumber = 2;
    const { currentPagePosts } = getPageContents(posts, pageNumber);

    const startIndex = (pageNumber - 1) * DEFAULT_NUMBER_OF_POSTS_PER_PAGE;
    const endIndex = startIndex + 5;
    const expectedPosts = posts.slice(startIndex, endIndex);

    expect(currentPagePosts).toHaveLength(expectedPosts.length);
    expect(currentPagePosts).toEqual(expectedPosts);
  });

  it('마지막 페이지일 경우 올바른 페이지 컨텐츠를 반환해야 합니다.', () => {
    const pageNumber = Math.ceil(posts.length / DEFAULT_NUMBER_OF_POSTS_PER_PAGE);
    const { currentPagePosts } = getPageContents(posts, pageNumber);

    const startIndex = (pageNumber - 1) * DEFAULT_NUMBER_OF_POSTS_PER_PAGE;
    const expectedPosts = posts.slice(startIndex);

    expect(currentPagePosts).toHaveLength(expectedPosts.length);
    expect(currentPagePosts).toEqual(expectedPosts);
  });
});
