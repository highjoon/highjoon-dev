const validatePageNumber = ({
  pageNumber,
  totalPagesOfPosts,
  postsPerPage,
}: {
  pageNumber: number;
  totalPagesOfPosts: number;
  postsPerPage: number;
}) => {
  if (isNaN(pageNumber) || pageNumber > Math.ceil(totalPagesOfPosts / postsPerPage) || pageNumber < 1) return false;
  return true;
};

export default validatePageNumber;
