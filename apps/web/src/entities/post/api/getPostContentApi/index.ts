import matter from 'gray-matter';

import { GetPostContentRequestDto } from '@/entities/post/api/getPostContentApi/dto';

/**
 * 게시물 콘텐츠 조회
 * @param params GetPostContentRequestDto
 * @returns 게시물 콘텐츠
 */
// 이미 백틱으로 감싸진 태그는 제외하고 MDX 파서가 JSX로 해석하는 HTML 태그를 인라인 코드로 변환
const HTML_TAGS_PATTERN = /(?<!`)<(script|style|link|meta|head|body|html)(\s[^>]*)?\/?>/gi;

const escapeInlineHtmlTags = (content: string) => content.replace(HTML_TAGS_PATTERN, (match) => `\`${match}\``);

export const getPostContentApi = async (params: GetPostContentRequestDto) => {
  const response = await fetch(params.contentUrl, {
    next: { revalidate: 3600, tags: ['post-content', params.contentUrl] },
  });
  const textContent = await response.text();
  const { content } = matter(textContent);

  return escapeInlineHtmlTags(content);
};
