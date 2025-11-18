import matter from 'gray-matter';

import { GetPostContentRequestDto } from '@/entities/post/api/getPostContentApi/dto';

/**
 * 게시물 콘텐츠 조회
 * @param params GetPostContentRequestDto
 * @returns 게시물 콘텐츠
 */
export const getPostContentApi = async (params: GetPostContentRequestDto) => {
  const response = await fetch(params.contentUrl, {
    next: { revalidate: false, tags: ['post-content', params.contentUrl] },
  });
  const textContent = await response.text();
  const { content } = matter(textContent);

  return content;
};
