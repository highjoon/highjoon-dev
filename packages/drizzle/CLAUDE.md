# @highjoon-dev/drizzle

Drizzle ORM 패키지. **이 프로젝트의 유일한 ORM이자 DB 스키마 소유자다.**

## 스키마 소유권 정책

**DB 스키마의 주인은 Drizzle이다. `schema/*.ts`가 단일 진실 원천(SSOT)이다.**

- DB 구조 변경(테이블/컬럼 추가·수정·삭제)은 `schema/*.ts`를 손으로 수정한 뒤 **`drizzle-kit generate`로 마이그레이션을 만들고 `migrate`로 적용**한다.
- `migrations/` 산출물을 커밋한다 (스키마 이력). `pull`은 기존 DB 역생성용 보조 도구.
- ⚠️ `migrate`/`push`는 **DDL이라 트랜잭션 풀러(6543)가 아닌 Supabase direct URL(5432)** 로 돌려야 한다. 런타임 쿼리용 `DATABASE_URL`(pgbouncer)과 구분.

## 구조

```
drizzle.config.ts   drizzle-kit 설정 (schema → ./schema, out → ./migrations)
client.ts           db 인스턴스 (node-postgres Pool + HMR 안전 싱글톤)
index.ts            barrel: drizzle-orm 재export + db, schema
schema/             테이블 정의 (도메인별 파일 분리, index.ts에서 re-export) — SSOT
migrations/         drizzle-kit generate 산출물 (커밋 대상)
```

## 명령어

```bash
pnpm -F @highjoon-dev/drizzle generate   # schema 변경 → 마이그레이션 SQL 생성
pnpm -F @highjoon-dev/drizzle migrate    # 마이그레이션 적용 (direct URL 필요)
pnpm -F @highjoon-dev/drizzle pull       # 기존 DB → 스키마 역생성 (introspection)
pnpm -F @highjoon-dev/drizzle studio     # Drizzle Studio
```

## 컨벤션

- DB 컬럼은 camelCase 그대로 사용 — `casing` 설정 없이 TS 필드명이 컬럼명과 1:1 매핑 (스키마 정의에 명시적 컬럼명 인자 불필요)
- 스키마 파일은 도메인별 (`post.ts`, `tag.ts` ...) 로 나누고 `schema/index.ts`에서 export
- 환경변수 `DATABASE_URL` 사용 (런타임은 pgbouncer 풀러, 마이그레이션은 direct URL)
- `id`는 `.$defaultFn(() => createId())`(`@paralleldrive/cuid2`)로 앱에서 생성. (기존 행은 cuid v1, 신규는 cuid2 — 둘 다 unique text라 무해)
- `timestamp`/`date`는 `mode: 'date'` — `Date` 반환 (문자열 아님)
- `updatedAt`은 `.$defaultFn + .$onUpdate(() => new Date())`

## 연결 주의 (Supabase 트랜잭션 풀러)

`DATABASE_URL`이 pgbouncer 트랜잭션 풀러(6543)다. **Drizzle `.prepare()`(named prepared statement)는 이 모드에서 깨지므로 사용 금지.** 일반 쿼리(`db.select()/insert()/update()/delete()`)는 unnamed라 정상 동작한다. 단일 트랜잭션 DDL(`DROP` 등)은 이 모드로도 돌릴 수 있으나, 다중 문장 마이그레이션은 direct URL(5432) 권장.

> 실제 DB는 현재 `schema/`와 일치한다. 과거 잔재(`User` 테이블·`Role` enum·`Post.likeCount`)는 모두 DROP 완료.
