import { POSTS_PER_PAGE } from '@/components/Common/pagination/Pagination';

const calculateTagPageCount = (numberOfTags: number) => {
  const pageCount = Math.ceil(numberOfTags / POSTS_PER_PAGE);
  return pageCount;
};

export default calculateTagPageCount;
