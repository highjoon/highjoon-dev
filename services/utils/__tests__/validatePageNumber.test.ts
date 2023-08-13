import validatePageNumber from '../validatePageNumber';

import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';

describe('validatePageNumber', () => {
  it('pageNumber의 유효성 검사를 통과하지 못할 경우 false를 반환합니다.', () => {
    const invalidPageNumbers = [-1, 0, 7, 'NaN'];

    invalidPageNumbers.forEach((pageNumber) => {
      const isValid = validatePageNumber({
        pageNumber: pageNumber as any,
        totalPagesOfPosts: 30,
        postsPerPage: DEFAULT_NUMBER_OF_POSTS_PER_PAGE,
      });

      expect(isValid).toEqual(false);
    });
  });

  it('pageNumber의 유효성 검사를 통과할 경우 true를 반환합니다.', () => {
    const validPageNumbers = [1, 2, 3];

    validPageNumbers.forEach((pageNumber) => {
      const isValid = validatePageNumber({
        pageNumber,
        totalPagesOfPosts: 30,
        postsPerPage: DEFAULT_NUMBER_OF_POSTS_PER_PAGE,
      });

      expect(isValid).toEqual(true);
    });
  });
});
