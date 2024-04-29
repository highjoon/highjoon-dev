import { POSTS_FILE_NAME } from '@/constants/blogPosts';
import createPostPath from '../createPostPath';

describe('createPostPath', () => {
  it.each(Object.values(POSTS_FILE_NAME))('slug "%s"로 올바른 포스트 경로를 생성합니다.', (fileName) => {
    const expectedPath = `/posts/${fileName}`;
    const result = createPostPath(fileName);
    expect(result).toBe(expectedPath);
  });
});
