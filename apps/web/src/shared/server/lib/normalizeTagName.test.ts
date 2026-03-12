import { normalizeTagName } from './normalizeTagName';

describe('normalizeTagName', () => {
  test('앞뒤 공백을 제거하고 소문자로 변환한다', () => {
    expect(normalizeTagName('  TypeScript  ')).toBe('typescript');
  });

  test('이미 소문자인 경우 그대로 반환한다', () => {
    expect(normalizeTagName('react')).toBe('react');
  });

  test('대소문자가 섞인 태그명을 소문자로 변환한다', () => {
    expect(normalizeTagName('Next.JS')).toBe('next.js');
  });
});
