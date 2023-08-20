import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '../constants/blogPosts';

const calculateTagPageCount = (numberOfTags: number) => {
  const pageCount = Math.ceil(numberOfTags / DEFAULT_NUMBER_OF_POSTS_PER_PAGE);
  return pageCount;
};

export default calculateTagPageCount;
