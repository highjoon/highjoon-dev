# @highjoon-dev/drizzle

Drizzle ORM 점진적 마이그레이션용 패키지. 현재는 `@highjoon-dev/prisma`와 병행한다.

## 구조

```
drizzle.config.ts   drizzle-kit 설정 (schema → ./schema, out → ./migrations)
client.ts           db 인스턴스 (node-postgres Pool + HMR 안전 싱글톤)
index.ts            barrel: drizzle-orm 재export + db, schema
schema/             테이블 정의 (도메인별 파일 분리, index.ts에서 re-export)
migrations/         drizzle-kit generate 결과물
```

## 명령어

```bash
pnpm -F @highjoon-dev/drizzle generate   # 스키마 → SQL 마이그레이션 생성
pnpm -F @highjoon-dev/drizzle migrate    # 마이그레이션 실행
pnpm -F @highjoon-dev/drizzle push       # 스키마 직접 반영 (dev)
pnpm -F @highjoon-dev/drizzle pull       # 기존 DB → 스키마 역생성 (introspection)
pnpm -F @highjoon-dev/drizzle studio     # Drizzle Studio
```

## 컨벤션

- `casing: "snake_case"` — TS 필드명은 camelCase, DB 컬럼은 snake_case 자동 변환
- 스키마 파일은 도메인별 (`post.ts`, `tag.ts` ...) 로 나누고 `schema/index.ts`에서 export
- 환경변수 `DATABASE_URL`은 Prisma와 공유
