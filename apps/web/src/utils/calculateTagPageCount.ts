import { POSTS_PER_PAGE } from '@/constants/post';

const calculateTagPageCount = (numberOfTags: number) => {
  const pageCount = Math.ceil(numberOfTags / POSTS_PER_PAGE);

  return pageCount;
};

export default calculateTagPageCount;
