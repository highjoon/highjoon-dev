import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import getBlogPosts from '../getBlogPosts';

import { BLOG_CONTENTS_DIR } from '@/services/constants/blogPosts';

jest.mock('fs');
jest.mock('gray-matter');

describe('getBlogPosts', () => {
  const mockReadFileSync = readFileSync as jest.Mock;
  const mockGrayMatter = matter as unknown as jest.Mock;

  beforeEach(() => {
    mockReadFileSync.mockReset();
    mockGrayMatter.mockReset();
  });

  it('올바른 구조의 블로그 포스트를 반환합니다.', () => {
    const mockFileContent = '---\ntitle: Test Title\ndescription: Test Description\ndate: 2023-08-05\n---\nContent';
    const mockFrontMatter = {
      title: 'Test Title',
      description: 'Test Description',
      date: '2023-08-05',
    };
    mockReadFileSync.mockReturnValue(mockFileContent);
    mockGrayMatter.mockReturnValue({ data: mockFrontMatter, content: 'Content' });

    const mockFiles = ['test-post1.mdx', 'test-post2.mdx'];
    const result = getBlogPosts(mockFiles);

    expect(result).toEqual([
      {
        meta: mockFrontMatter,
        slug: 'test-post1',
        content: 'Content',
      },
      {
        meta: mockFrontMatter,
        slug: 'test-post2',
        content: 'Content',
      },
    ]);

    expect(mockReadFileSync).toHaveBeenCalledTimes(2);
    expect(mockReadFileSync).toHaveBeenCalledWith(path.join(BLOG_CONTENTS_DIR, 'test-post1.mdx'), 'utf-8');
    expect(mockReadFileSync).toHaveBeenCalledWith(path.join(BLOG_CONTENTS_DIR, 'test-post2.mdx'), 'utf-8');

    expect(mockGrayMatter).toHaveBeenCalledTimes(2);
    expect(mockGrayMatter).toHaveBeenCalledWith(mockFileContent);
  });
});
