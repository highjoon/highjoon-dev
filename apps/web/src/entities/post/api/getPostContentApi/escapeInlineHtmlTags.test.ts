import { escapeInlineHtmlTags } from './escapeInlineHtmlTags';

describe('escapeInlineHtmlTags', () => {
  describe('<script> 태그 처리', () => {
    test('<script> 태그를 백틱으로 감싼다', () => {
      const input = '브라우저는 <script> 태그를 만나면';
      expect(escapeInlineHtmlTags(input)).toBe('브라우저는 `<script>` 태그를 만나면');
    });

    test('한글 뒤에 바로 붙은 <script> 태그를 처리한다', () => {
      const input = '<script>에서 localStorage 값을 읽는다';
      expect(escapeInlineHtmlTags(input)).toBe('`<script>`에서 localStorage 값을 읽는다');
    });

    test('한 문단에 여러 <script> 태그를 모두 처리한다', () => {
      const input = '<script> 태그를 만나면 파싱을 멈추고 <script>에서 값을 읽는다';
      expect(escapeInlineHtmlTags(input)).toBe('`<script>` 태그를 만나면 파싱을 멈추고 `<script>`에서 값을 읽는다');
    });

    test('이미 백틱으로 감싸진 <script> 태그는 이중 처리하지 않는다', () => {
      const input = '이미 감싸진 `<script>` 태그';
      expect(escapeInlineHtmlTags(input)).toBe('이미 감싸진 `<script>` 태그');
    });
  });

  describe('기타 HTML 태그 처리', () => {
    test('<style> 태그를 백틱으로 감싼다', () => {
      const input = '<style> 태그로 스타일을 적용한다';
      expect(escapeInlineHtmlTags(input)).toBe('`<style>` 태그로 스타일을 적용한다');
    });

    test('<link> 태그를 백틱으로 감싼다', () => {
      const input = '<link rel="stylesheet" href="style.css"> 태그';
      expect(escapeInlineHtmlTags(input)).toBe('`<link rel="stylesheet" href="style.css">` 태그');
    });

    test('<meta> 태그를 백틱으로 감싼다', () => {
      const input = '<meta charset="UTF-8"> 태그';
      expect(escapeInlineHtmlTags(input)).toBe('`<meta charset="UTF-8">` 태그');
    });

    test('처리 대상이 아닌 태그는 그대로 둔다', () => {
      const input = '<div>나 <span>은 처리하지 않는다</span></div>';
      expect(escapeInlineHtmlTags(input)).toBe('<div>나 <span>은 처리하지 않는다</span></div>');
    });
  });

  describe('코드 블록 내 태그 처리', () => {
    test('백틱 코드 블록 안의 태그는 이중 처리하지 않는다', () => {
      const input = '인라인 코드 `<script>` 예시';
      expect(escapeInlineHtmlTags(input)).toBe('인라인 코드 `<script>` 예시');
    });
  });
});
