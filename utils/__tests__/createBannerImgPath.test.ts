import { POSTS_FILE_NAME } from '@/constants/blogPosts';

import createBannerImgPath from '../createBannerImgPath';

describe('createBannerImgPath', () => {
  it.each(Object.values(POSTS_FILE_NAME))('파일 이름 "%s"으로 올바른 배너 이미지 경로를 생성합니다.', (fileName) => {
    const expectedPath = `/images/contents/${fileName}/img-banner.png`;
    const result = createBannerImgPath(fileName);
    expect(result).toBe(expectedPath);
  });
});
