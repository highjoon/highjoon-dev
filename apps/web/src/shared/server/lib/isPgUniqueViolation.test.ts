import { isPgUniqueViolation } from './isPgUniqueViolation';

describe('isPgUniqueViolation', () => {
  test('SQLSTATE 23505 에러면 true', () => {
    expect(isPgUniqueViolation(Object.assign(new Error('dup'), { code: '23505' }))).toBe(true);
  });

  test('다른 코드면 false', () => {
    expect(isPgUniqueViolation(Object.assign(new Error('fk'), { code: '23503' }))).toBe(false);
  });

  test('코드 없는 에러나 비에러면 false', () => {
    expect(isPgUniqueViolation(new Error('plain'))).toBe(false);
    expect(isPgUniqueViolation('string')).toBe(false);
    expect(isPgUniqueViolation(null)).toBe(false);
  });
});
