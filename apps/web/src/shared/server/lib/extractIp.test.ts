/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { extractIp } from './extractIp';

describe('extractIp', () => {
  test('x-forwarded-for 헤더에서 첫 번째 IP를 추출한다', () => {
    const request = new NextRequest('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });

    expect(extractIp(request)).toBe('1.2.3.4');
  });

  test('x-forwarded-for 헤더가 단일 IP이면 그대로 반환한다', () => {
    const request = new NextRequest('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });

    expect(extractIp(request)).toBe('1.2.3.4');
  });

  test('x-forwarded-for 헤더가 없으면 빈 문자열을 반환한다', () => {
    const request = new NextRequest('http://localhost');

    expect(extractIp(request)).toBe('');
  });
});
