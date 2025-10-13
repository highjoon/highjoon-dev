import matter from 'gray-matter';

import { GetPostContentDto } from '@/entities/post/model/dto/getPostContentDto';

/**
 * 게시물 콘텐츠 조회
 * @param params GetPostContentDto
 * @returns 게시물 콘텐츠
 */
export const getPostContent = async (params: GetPostContentDto) => {
  const response = await fetch(params.contentUrl);
  const textContent = await response.text();
  const { content } = matter(textContent);

  return content;
};
