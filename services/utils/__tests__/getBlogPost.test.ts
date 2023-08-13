import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import createBannerImgPath from '../createBannerImgPath';
import getBlogPost from '../getBlogPost';

import { BLOG_CONTENTS_DIR } from '@/services/constants/blogPosts';

jest.mock('fs');
jest.mock('gray-matter');
jest.mock('../createBannerImgPath');

describe('getBlogPost', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock;
  const mockMatter = matter as unknown as jest.Mock;
  const mockCreateBannerImgPath = createBannerImgPath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('올바른 구조의 블로그 포스트 데이터를 반환합니다.', () => {
    const slug = 'mock-post';
    const mockMarkdownFile = 'Mock Post Contents';
    const mockFrontMatter = { title: 'Mock Post', date: '2023-08-13' };
    const mockContent = 'Mock content';
    const mockBannerImg = `images/contents/${slug}/img-banner.png`;

    mockReadFileSync.mockReturnValue(mockMarkdownFile);
    mockMatter.mockReturnValue({ data: mockFrontMatter, content: mockContent });
    mockCreateBannerImgPath.mockReturnValue(mockBannerImg);

    const result = getBlogPost({ slug });

    expect(mockReadFileSync).toHaveBeenCalledWith(path.join(BLOG_CONTENTS_DIR, slug + '.mdx'), 'utf-8');
    expect(mockMatter).toHaveBeenCalledWith(mockMarkdownFile);
    expect(mockCreateBannerImgPath).toHaveBeenCalledWith('mock-post');

    expect(result).toEqual({
      frontMatter: { ...mockFrontMatter, bannerImg: mockBannerImg },
      slug,
      content: mockContent,
    });
  });
});
