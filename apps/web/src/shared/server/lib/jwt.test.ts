import jwt from 'jsonwebtoken';

import { type JwtPayload } from '@/shared/server/lib/auth';

import { signToken, verifyToken } from './jwt';

const TEST_SECRET = 'test-secret-key';

beforeAll(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

describe('signToken', () => {
  test('유효한 JWT 토큰을 생성한다', () => {
    const payload: JwtPayload = { userId: 'user-1', role: 'USER' };
    const token = signToken(payload);

    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('토큰에 payload 정보가 포함된다', () => {
    const payload: JwtPayload = { userId: 'user-1', role: 'ADMIN' };
    const token = signToken(payload);
    const decoded = jwt.decode(token) as JwtPayload & { exp: number };

    expect(decoded.userId).toBe('user-1');
    expect(decoded.role).toBe('ADMIN');
  });
});

describe('verifyToken', () => {
  test('유효한 토큰을 검증하면 payload를 반환한다', () => {
    const payload: JwtPayload = { userId: 'user-1', role: 'USER' };
    const token = signToken(payload);
    const result = verifyToken(token);

    expect(result.userId).toBe('user-1');
    expect(result.role).toBe('USER');
  });

  test('잘못된 토큰이면 에러를 던진다', () => {
    expect(() => verifyToken('invalid-token')).toThrow();
  });

  test('다른 시크릿으로 서명된 토큰이면 에러를 던진다', () => {
    const token = jwt.sign({ userId: 'user-1', role: 'USER' }, 'wrong-secret');

    expect(() => verifyToken(token)).toThrow();
  });
});
