import { fixBoldAfterPunctuation } from './fixBoldAfterPunctuation';

describe('fixBoldAfterPunctuation', () => {
  describe('CommonMark 파싱 실패 케이스 → <strong> 변환', () => {
    test('닫는 ** 뒤에 한글이 바로 이어지면 <strong>으로 변환한다', () => {
      const input = '브라우저는 **HTML을 파싱(①)**하는 도중';
      expect(fixBoldAfterPunctuation(input)).toBe('브라우저는 <strong>HTML을 파싱(①)</strong>하는 도중');
    });

    test(') 뒤 ** 다음에 영문자가 오면 <strong>으로 변환한다', () => {
      const input = '**parsing(step)**done';
      expect(fixBoldAfterPunctuation(input)).toBe('<strong>parsing(step)</strong>done');
    });

    test('] 뒤 ** 다음에 글자가 오면 <strong>으로 변환한다', () => {
      const input = '**항목[0]**번째';
      expect(fixBoldAfterPunctuation(input)).toBe('<strong>항목[0]</strong>번째');
    });
  });

  describe('CommonMark 파싱 성공 케이스 → 변환하지 않음', () => {
    test('닫는 ** 뒤에 공백이 오면 변환하지 않는다', () => {
      const input = '**깜빡임이 발생한다.** `useEffect`는';
      expect(fixBoldAfterPunctuation(input)).toBe('**깜빡임이 발생한다.** `useEffect`는');
    });

    test('닫는 ** 뒤에 줄끝이 오면 변환하지 않는다', () => {
      const input = '**React가 너무 늦게 개입한다는 것.**';
      expect(fixBoldAfterPunctuation(input)).toBe('**React가 너무 늦게 개입한다는 것.**');
    });

    test('닫는 ** 앞이 일반 글자이고 뒤에 공백이 오면 변환하지 않는다', () => {
      const input = '**⑤ Paint** 이전에';
      expect(fixBoldAfterPunctuation(input)).toBe('**⑤ Paint** 이전에');
    });
  });

  describe('한 문장에 여러 패턴이 있는 경우', () => {
    test('변환 대상과 비대상이 섞여 있으면 대상만 변환한다', () => {
      const input = '**HTML을 파싱(①)**하는 도중 **React가 늦게 개입한다는 것.** 이유가 있다.';
      expect(fixBoldAfterPunctuation(input)).toBe(
        '<strong>HTML을 파싱(①)</strong>하는 도중 **React가 늦게 개입한다는 것.** 이유가 있다.',
      );
    });
  });
});
