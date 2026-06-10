/**
 * node-postgres(DatabaseError)의 SQLSTATE 코드로 unique 제약 위반(23505)을 판별한다.
 * Drizzle은 ORM 추상화 에러 대신 pg 원시 에러를 던지므로 이 헬퍼로 분기한다.
 */
export const isPgUniqueViolation = (error: unknown): boolean =>
  error instanceof Error && 'code' in error && (error as { code?: string }).code === '23505';
