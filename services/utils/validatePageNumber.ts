import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '../constants/blogPosts';
import { posts } from '../data/posts';

const validatePageNumber = (pageNumber: number) => {
  return isNaN(pageNumber) || pageNumber > Math.ceil(posts.length / DEFAULT_NUMBER_OF_POSTS_PER_PAGE) || pageNumber < 1;
};

export default validatePageNumber;
