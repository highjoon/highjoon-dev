# @highjoon-dev/drizzle

Drizzle ORM 점진적 마이그레이션용 패키지. 현재는 `@highjoon-dev/prisma`와 병행한다.

## 마이그레이션 소유권 정책

**DB 스키마의 주인은 Prisma다. Drizzle은 쿼리(읽기/쓰기) 전용이다.**

- DB 구조 변경(테이블/컬럼 추가·수정·삭제)은 **오직 Prisma 마이그레이션**(`pnpm prisma migrate`)으로만 한다.
- Drizzle은 구조를 바꾸지 않는다 — `drizzle-kit generate`/`migrate`/`push`는 **사용하지 않는다**. `schema/*.ts`는 Prisma가 만든 DB 구조를 따라가는 거울일 뿐이다 (변경 시 `pull`로 역생성하거나 손으로 맞춤).
- 서비스 코드를 도메인 단위로 Prisma → Drizzle 쿼리로 점진 전환한다. 모든 전환이 끝나면 그때 소유권 이전 여부를 재검토한다.

## 구조

```
drizzle.config.ts   drizzle-kit 설정 (schema → ./schema, out → ./migrations)
client.ts           db 인스턴스 (node-postgres Pool + HMR 안전 싱글톤)
index.ts            barrel: drizzle-orm 재export + db, schema
schema/             테이블 정의 (도메인별 파일 분리, index.ts에서 re-export)
```

> 마이그레이션은 Prisma가 소유하므로 `migrations/` 산출물은 두지 않는다 (위 소유권 정책 참고).

## 명령어

```bash
pnpm -F @highjoon-dev/drizzle pull       # 기존 DB → 스키마 역생성 (introspection)
pnpm -F @highjoon-dev/drizzle studio     # Drizzle Studio
```

> 구조를 바꾸는 `generate`/`migrate`/`push`/`check`는 소유권 정책상 사용하지 않는다 (Prisma 전용).

## 컨벤션

- DB 컬럼은 Prisma가 만든 camelCase 그대로 사용 — `casing` 설정 없이 TS 필드명이 컬럼명과 1:1 매핑 (스키마 정의에 명시적 컬럼명 인자 불필요)
- 스키마 파일은 도메인별 (`post.ts`, `tag.ts` ...) 로 나누고 `schema/index.ts`에서 export
- 환경변수 `DATABASE_URL`은 Prisma와 공유
- `id`는 `.$defaultFn(() => createId())`(`@paralleldrive/cuid2`)로 앱에서 생성 — Prisma의 `@default(cuid())` 대체. (기존 행은 cuid v1, 신규는 cuid2 — 둘 다 unique text라 무해)
- `timestamp`/`date`는 `mode: 'date'` — Prisma처럼 `Date` 반환 (문자열 아님)
- `updatedAt`은 `.$defaultFn + .$onUpdate(() => new Date())` — Prisma의 `@updatedAt` 대체

## 연결 주의 (Supabase 트랜잭션 풀러)

`DATABASE_URL`이 pgbouncer 트랜잭션 풀러(6543)다. **Drizzle `.prepare()`(named prepared statement)는 이 모드에서 깨지므로 사용 금지.** 일반 쿼리(`db.select()/insert()/update()/delete()`)는 unnamed라 정상 동작한다.

## 알려진 DB Drift (후속 정리 대상)

Drizzle 스키마는 현재 Prisma 모델과 일치시킨다. 단, 실제 DB에는 과거 정리 미완으로 남은 잔재가 있다 — 별도 DB 마이그레이션으로 제거 예정 (Supabase direct URL 필요):

- `User` 테이블 + `Role` enum — giscus 외주화로 Prisma에선 제거됐으나 DB에 잔존
- `Post.likeCount` 컬럼 — Prisma/스키마엔 없으나 DB에 잔존

`.migrations-reference/`(introspection 원본)에는 위 잔재가 그대로 보이지만, `schema/`는 의도적으로 제외한다.
