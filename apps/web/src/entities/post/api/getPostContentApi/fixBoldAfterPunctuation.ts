// CommonMark 규칙: 닫는 **가 구두점 뒤에 있고 바로 비공백 문자가 이어지면 bold로 인식하지 않음
// 예) **HTML을 파싱(①)**하는 → <strong>HTML을 파싱(①)</strong>하는
// 참고: https://spec.commonmark.org/0.31.2/#right-flanking-delimiter-run
const BOLD_AFTER_PUNCTUATION_PATTERN = /\*\*([^*\n]+?[^\w\s\n])\*\*(?=\S)/g;

export const fixBoldAfterPunctuation = (content: string): string =>
  content.replace(BOLD_AFTER_PUNCTUATION_PATTERN, '<strong>$1</strong>');
