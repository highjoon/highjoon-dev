# packages/prisma - Database Schema

PostgreSQL + Prisma ORM. 스키마: `schema.prisma`, 생성된 클라이언트: `generated/client/` (gitignored).

- `binaryTargets: ["native", "rhel-openssl-3.0.x"]` — Vercel(Linux) 배포용
- `index.ts`에서 글로벌 싱글턴 export (`globalThis.prisma`) — Next dev hot-reload 시 연결 폭주 방지

## Commands

```bash
pnpm prisma generate       # 클라이언트 생성 (root postinstall에 포함)
pnpm prisma migrate        # 마이그레이션 (.env DATABASE_URL)
pnpm prisma push           # DB push (마이그레이션 없이 스키마 동기화)
pnpm prisma pull           # DB pull
pnpm prisma deploy         # prisma migrate deploy (CI/CD)
```

## Models & Relations

```
Post ──< PostTag >── Tag
 │
 ├──< PostViewLog       (postId+ip+date unique, 일별 중복 조회 차단)
 ├──< PostViewStats     (postId+date unique, 일별 누적)
 └──> Category          (categoryId nullable, onDelete: SetNull)

Category ──< Category   (parentId self-ref, onDelete: Restrict — 하위 있으면 삭제 불가)
```

## Key Points

- **삭제 동작**:
  - `Post → PostTag/PostViewLog/PostViewStats`: Cascade
  - `Post.categoryRef`: SetNull (카테고리 삭제 시 게시물은 유지, 미분류로)
  - `Category.parent`: Restrict (하위 카테고리 존재 시 부모 삭제 금지)
- **댓글/좋아요/유저 모델 없음** — giscus(GitHub Discussions)로 외주화 (`User`, `Comment`, `PostLike`는 과거 제거됨)
- 타임스탬프는 `Timestamptz(6)`로 통일, 일별 집계용 컬럼만 `@db.Date`
- `packages/prisma/.env`의 `DATABASE_URL`을 Prisma CLI가 자동 로드
