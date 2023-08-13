import { posts } from '../data/posts';

const getPageContents = (pageNumber: number) => {
  const startIndex = (pageNumber - 1) * 5;
  const endIndex = startIndex + 5;

  const currentPagePosts = posts.slice(startIndex, endIndex);
  const hasNextPage = (pageNumber - 1) * 5 + 5 < posts.length;

  return { currentPagePosts, hasNextPage };
};

export default getPageContents;
