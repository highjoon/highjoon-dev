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

### Post

`id` `slug(unique)` `title` `description` `contentUrl` `bannerImageUrl` `publishedAt` `category` `viewCount` `likeCount` `isFeatured` `isHidden` `createdAt` `updatedAt`

### User

`id` `githubId` `name` `avatarUrl` `homeUrl` `role(USER|ADMIN)`

### Comment (self-referencing: parentId → replies)

`id` `postId` `userId` `content` `parentId(nullable)` `createdAt` `updatedAt`

### PostLike (unique: postId + userId)

`id` `postId` `userId` `createdAt`

### Tag (unique: name)

`id` `name` `createdAt` `updatedAt`

### PostTag (unique: postId + tagId)

`id` `postId` `tagId` `createdAt`

### PostViewLog (unique: postId + ip + date)

`id` `postId` `ip` `date` `expiredAt` — IP 기반 중복 조회 방지

### PostViewStats (unique: postId + date)

`id` `postId` `date` `viewCount` — 일별 조회 통계

## Key Points

- 모든 삭제는 Cascade (Post 삭제 시 관련 데이터 모두 삭제)
- Comment는 self-referencing으로 대댓글 구현 (parentId)
- 환경별 .env 파일로 DATABASE_URL 관리
