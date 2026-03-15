# packages/prisma - Database Schema

PostgreSQL + Prisma ORM. 스키마: `schema.prisma`

## Commands

```bash
pnpm prisma generate       # Prisma 클라이언트 생성
pnpm prisma migrate-dev    # 개발 마이그레이션
pnpm prisma migrate        # 프로덕션 마이그레이션
pnpm prisma push-dev       # 개발 DB push (마이그레이션 없이)
pnpm prisma pull-dev       # 개발 DB pull
```

## Models & Relations

```
Post ──< PostTag >── Tag
 │
 ├──< PostLike >── User
 ├──< Comment ──< Comment (self-ref: replies)
 │       └── User
 ├──< PostViewLog
 └──< PostViewStats
```

## Key Points

- 모든 삭제는 Cascade (Post 삭제 시 관련 데이터 모두 삭제)
- Comment는 self-referencing으로 대댓글 구현 (parentId)
- 환경별 .env 파일로 DATABASE_URL 관리
- Client 초기화: `index.ts`에서 글로벌 싱글턴 패턴 (개발 시 hot-reload 대응)
