import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '../constants/blogPosts';
import { Post } from '../types/post';

const getPageContents = (posts: Post[], pageNumber: number) => {
  const startIndex = (pageNumber - 1) * DEFAULT_NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + DEFAULT_NUMBER_OF_POSTS_PER_PAGE;

  const currentPagePosts = posts.slice(startIndex, endIndex);
  const hasNextPage =
    (pageNumber - 1) * DEFAULT_NUMBER_OF_POSTS_PER_PAGE + DEFAULT_NUMBER_OF_POSTS_PER_PAGE < posts.length;

  return { currentPagePosts, hasNextPage };
};

export default getPageContents;
