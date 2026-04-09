// MDX 파서가 JSX로 해석하는 HTML 태그를 인라인 코드로 변환
// 이미 백틱으로 감싸진 태그는 건너뜀
const HTML_TAGS_PATTERN = /(?<!`)<(script|style|link|meta|head|body|html)(\s[^>]*)?\/?>/gi;

export const escapeInlineHtmlTags = (content: string): string =>
  content.replace(HTML_TAGS_PATTERN, (match) => `\`${match}\``);
