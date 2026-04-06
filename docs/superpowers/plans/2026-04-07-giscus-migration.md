# giscus 마이그레이션 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 커스텀 DB 기반 인증/댓글/좋아요 시스템을 전부 제거하고 giscus(GitHub Discussions) 위젯으로 대체한다.

**Architecture:** giscus는 GitHub Discussions를 백엔드로 사용하는 iframe 기반 위젯이다. 포스트 상세 페이지에서 `LikeCommentsSection` 위젯을 `GiscusWidget`으로 교체한다. Prisma DB는 조회수 추적(PostViewLog, PostViewStats)에만 사용된다.

**Tech Stack:** `@giscus/react`, `next-themes` (테마 연동), Prisma (DB 일부 유지), pnpm 모노레포

---

## 사전 조건: giscus.app 설정 (코드 작업 전 필수)

다음을 먼저 완료해야 Task 7이 동작한다:
1. GitHub repo에서 **Discussions 탭 활성화** (Settings → Features → Discussions)
2. https://giscus.app 에서 repo 연결 + category 설정
3. 생성된 4개 값을 메모: `data-repo`, `data-repo-id`, `data-category`, `data-category-id`

---

## 파일 변경 요약

**삭제:**
- `apps/web/src/features/auth/` (전체)
- `apps/web/src/features/likePost/` (전체)
- `apps/web/src/features/createComment/` (전체)
- `apps/web/src/features/editComment/` (전체)
- `apps/web/src/features/deleteComment/` (전체)
- `apps/web/src/features/createReply/` (전체)
- `apps/web/src/features/manageComment/` (전체)
- `apps/web/src/entities/comment/` (전체)
- `apps/web/src/entities/user/` (전체)
- `apps/web/src/entities/post/services/postLike.service.ts`
- `apps/web/src/entities/post/ui/postDetail/InteractionBar.tsx`
- `apps/web/src/widgets/commentSection/` (전체)
- `apps/web/src/widgets/likeCommentsSection/` (전체)
- `apps/web/src/shared/server/lib/auth.ts`, `auth.test.ts`
- `apps/web/src/shared/server/lib/jwt.ts`, `jwt.test.ts`
- `apps/web/src/shared/lib/decodeToken.ts`
- `apps/web/src/page/auth/` (전체)
- `apps/web/app/api/auth/` (전체)
- `apps/web/app/api/comment/` (전체)
- `apps/web/app/api/user/` (전체)
- `apps/web/app/api/post/[slug]/like/route.ts`
- `apps/web/app/api/post/[slug]/unlike/route.ts`
- `apps/web/app/auth/` (전체)
- `packages/types/comment.ts`
- `packages/types/user.ts`

**수정:**
- `packages/prisma/schema.prisma` — User, Comment, PostLike, Role 제거; Post.likeCount 제거
- `packages/types/index.ts` — comment/user export 제거
- `apps/web/src/page/blogs/ui/PostPage.tsx` — LikeCommentsSection → GiscusWidget 교체
- `turbo.json` — auth 관련 env 제거
- `apps/web/CLAUDE.md` — 인증 관련 설명 제거

**생성:**
- `apps/web/src/widgets/giscus/ui/Giscus.tsx`

---

## Task 1: 의존성 업데이트

**Files:**
- Modify: `apps/web/package.json`

- [ ] **Step 1: @giscus/react 설치**

```bash
pnpm --filter @highjoon-dev/web add @giscus/react
```

- [ ] **Step 2: 사용하지 않을 패키지 제거**

```bash
pnpm --filter @highjoon-dev/web remove jsonwebtoken cookies-next
```

`@types/jsonwebtoken`은 devDependency인지 확인 후 제거:

```bash
pnpm --filter @highjoon-dev/web remove @types/jsonwebtoken
```

- [ ] **Step 3: 설치 확인**

```bash
grep -E '"@giscus|jsonwebtoken|cookies-next' apps/web/package.json
```

Expected: `@giscus/react` 존재, `jsonwebtoken`/`cookies-next` 없음

---

## Task 2: Prisma 스키마 수정 + 마이그레이션

**Files:**
- Modify: `packages/prisma/schema.prisma`

- [ ] **Step 1: schema.prisma 수정**

`packages/prisma/schema.prisma` 전체를 아래로 교체:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
  output        = "./generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

/// This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
model Post {
  id             String          @id @default(cuid())
  slug           String          @unique
  title          String
  description    String
  contentUrl     String
  bannerImageUrl String
  publishedAt    DateTime        @db.Timestamptz(6)
  category       String?
  createdAt      DateTime?       @default(now()) @db.Timestamptz(6)
  updatedAt      DateTime?       @updatedAt @db.Timestamptz(6)
  viewCount      Int?            @default(0)
  isFeatured     Boolean         @default(false)
  isHidden       Boolean         @default(false)
  viewLogs       PostViewLog[]
  viewStats      PostViewStats[]
  postTags       PostTag[]

  @@index([publishedAt])
}

model PostViewStats {
  id        String   @id @default(cuid())
  postId    String
  date      DateTime @db.Date
  viewCount Int      @default(0)
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, date])
}

model PostViewLog {
  id        String   @id @default(cuid())
  postId    String
  ip        String
  date      DateTime @db.Date
  expiredAt DateTime @db.Timestamptz(6)
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, ip, date])
}

model Tag {
  id        String    @id @default(cuid())
  name      String    @unique
  createdAt DateTime  @default(now()) @db.Timestamptz(6)
  updatedAt DateTime  @updatedAt @db.Timestamptz(6)
  postTags  PostTag[]

  @@index([name])
}

model PostTag {
  id        String   @id @default(cuid())
  postId    String
  tagId     String
  createdAt DateTime @default(now()) @db.Timestamptz(6)

  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@unique([postId, tagId])
  @@index([postId])
  @@index([tagId])
}
```

- [ ] **Step 2: 개발 DB에 마이그레이션 적용**

```bash
pnpm prisma migrate-dev --name remove-auth-comments-likes
```

Expected: 마이그레이션 파일 생성 + DB에 적용됨 (User, Comment, PostLike 테이블 DROP, Post.likeCount DROP)

- [ ] **Step 3: Prisma 클라이언트 재생성 확인**

```bash
pnpm prisma generate
```

Expected: `packages/prisma/generated/client` 재생성 완료

---

## Task 3: types 패키지 정리

**Files:**
- Delete: `packages/types/comment.ts`
- Delete: `packages/types/user.ts`
- Modify: `packages/types/index.ts`

> `comment.ts`는 삭제된 `Comment` 모델을 import하므로 컴파일 에러가 발생한다. `user.ts`의 모든 타입(GithubUserData, UserData, TokenData, LikedPost)은 삭제되는 코드에서만 사용된다.

- [ ] **Step 1: comment.ts, user.ts 삭제**

```bash
rm packages/types/comment.ts packages/types/user.ts
```

- [ ] **Step 2: index.ts에서 해당 export 제거**

`packages/types/index.ts`를 아래로 교체:

```typescript
export * from "./utils";
export * from "./api";
```

---

## Task 4: features 전체 삭제

**Files:**
- Delete: `apps/web/src/features/auth/` (전체)
- Delete: `apps/web/src/features/likePost/` (전체)
- Delete: `apps/web/src/features/createComment/` (전체)
- Delete: `apps/web/src/features/editComment/` (전체)
- Delete: `apps/web/src/features/deleteComment/` (전체)
- Delete: `apps/web/src/features/createReply/` (전체)
- Delete: `apps/web/src/features/manageComment/` (전체)

- [ ] **Step 1: 삭제 실행**

```bash
rm -rf \
  apps/web/src/features/auth \
  apps/web/src/features/likePost \
  apps/web/src/features/createComment \
  apps/web/src/features/editComment \
  apps/web/src/features/deleteComment \
  apps/web/src/features/createReply \
  apps/web/src/features/manageComment
```

- [ ] **Step 2: 삭제 확인**

```bash
ls apps/web/src/features/
```

Expected: `theme/` 같은 나머지 features만 남아있음

---

## Task 5: entities, widgets, shared 삭제

**Files:**
- Delete: `apps/web/src/entities/comment/` (전체)
- Delete: `apps/web/src/entities/user/` (전체)
- Delete: `apps/web/src/entities/post/services/postLike.service.ts`
- Delete: `apps/web/src/entities/post/ui/postDetail/InteractionBar.tsx`
- Delete: `apps/web/src/widgets/commentSection/` (전체)
- Delete: `apps/web/src/widgets/likeCommentsSection/` (전체)
- Delete: `apps/web/src/shared/server/lib/auth.ts`
- Delete: `apps/web/src/shared/server/lib/auth.test.ts`
- Delete: `apps/web/src/shared/server/lib/jwt.ts`
- Delete: `apps/web/src/shared/server/lib/jwt.test.ts`
- Delete: `apps/web/src/shared/lib/decodeToken.ts`

- [ ] **Step 1: 삭제 실행**

```bash
rm -rf \
  apps/web/src/entities/comment \
  apps/web/src/entities/user \
  apps/web/src/widgets/commentSection \
  apps/web/src/widgets/likeCommentsSection

rm -f \
  apps/web/src/entities/post/services/postLike.service.ts \
  apps/web/src/entities/post/ui/postDetail/InteractionBar.tsx \
  apps/web/src/shared/server/lib/auth.ts \
  apps/web/src/shared/server/lib/auth.test.ts \
  apps/web/src/shared/server/lib/jwt.ts \
  apps/web/src/shared/server/lib/jwt.test.ts \
  apps/web/src/shared/lib/decodeToken.ts
```

---

## Task 6: API routes + 인증 페이지 삭제

**Files:**
- Delete: `apps/web/app/api/auth/` (전체)
- Delete: `apps/web/app/api/comment/` (전체)
- Delete: `apps/web/app/api/user/` (전체)
- Delete: `apps/web/app/api/post/[slug]/like/route.ts`
- Delete: `apps/web/app/api/post/[slug]/unlike/route.ts`
- Delete: `apps/web/app/auth/` (전체)
- Delete: `apps/web/src/page/auth/` (전체)

- [ ] **Step 1: 삭제 실행**

```bash
rm -rf \
  apps/web/app/api/auth \
  apps/web/app/api/comment \
  apps/web/app/api/user \
  apps/web/app/auth \
  apps/web/src/page/auth

rm -f \
  "apps/web/app/api/post/[slug]/like/route.ts" \
  "apps/web/app/api/post/[slug]/unlike/route.ts"
```

- [ ] **Step 2: like/unlike 빈 디렉토리 제거**

```bash
rmdir "apps/web/app/api/post/[slug]/like" "apps/web/app/api/post/[slug]/unlike" 2>/dev/null || true
```

---

## Task 7: GiscusWidget 컴포넌트 생성

**Files:**
- Create: `apps/web/src/widgets/giscus/ui/Giscus.tsx`

> 이 컴포넌트는 `next-themes`의 `useTheme`으로 현재 테마를 읽어 giscus에 전달한다. 4개의 `NEXT_PUBLIC_GISCUS_*` 환경 변수를 사용한다 — giscus.app에서 얻은 값을 `.env.development`와 `.env.production`에 추가해야 한다.

- [ ] **Step 1: 디렉토리 생성 + 컴포넌트 작성**

`apps/web/src/widgets/giscus/ui/Giscus.tsx` 생성:

```tsx
'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function GiscusWidget() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="ko"
      loading="lazy"
    />
  );
}
```

- [ ] **Step 2: 환경 변수를 .env.development에 추가**

`apps/web/.env.development`에 다음 4줄 추가 (giscus.app에서 얻은 실제 값으로):

```
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxx
```

`.env.production`에도 동일하게 추가.

---

## Task 8: PostPage 업데이트

**Files:**
- Modify: `apps/web/src/page/blogs/ui/PostPage.tsx`

- [ ] **Step 1: PostPage.tsx 수정**

`apps/web/src/page/blogs/ui/PostPage.tsx`의 import와 JSX를 수정한다:

기존:
```tsx
import LikeCommentsSection from '@/widgets/likeCommentsSection/ui/LikeCommentsSection';
```

교체 후:
```tsx
import GiscusWidget from '@/widgets/giscus/ui/Giscus';
```

기존 JSX:
```tsx
<LikeCommentsSection post={post} />
```

교체 후:
```tsx
<GiscusWidget />
```

최종 파일 전체:

```tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Post } from '@highjoon-dev/prisma';

import { getPostApi } from '@/entities/post/api/getPostApi';
import { getPostContentApi } from '@/entities/post/api/getPostContentApi';
import PostSchema from '@/entities/post/lib/PostSchema';
import { extractHeadings } from '@/entities/post/lib/toc/extractHeadings';
import PostArticleContent from '@/entities/post/ui/postDetail/PostArticleContent';
import PostBanner from '@/entities/post/ui/postDetail/PostBanner';
import PostDetailHeader from '@/entities/post/ui/postDetail/PostDetailHeader';
import TableOfContentsSidebar from '@/entities/post/ui/postDetail/TableOfContentsSidebar';
import TableOfContentsModal from '@/entities/post/ui/TableOfContentsModal';
import PageSection from '@/shared/ui/layout/PageSection';
import GiscusWidget from '@/widgets/giscus/ui/Giscus';

interface Props {
  params: { slug: Post['slug'] };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostApi(params);

  if (!post) {
    notFound();
  }

  const content = await getPostContentApi({ contentUrl: post.contentUrl });
  const headings = extractHeadings(content);

  return (
    <PageSection as="article" withContainer={false}>
      <PostSchema post={post} />

      <div className="max-w-4xl px-4 mx-auto md:px-6">
        <PostDetailHeader
          title={post.title}
          viewCount={post.viewCount || 0}
          createdAt={post.createdAt}
          slug={post.slug}
          postTags={post.postTags}
        />
      </div>

      <PostBanner bannerImageUrl={post.bannerImageUrl} title={post.title} />

      <div className="flex flex-col gap-12 px-4 mx-auto md:px-6 max-w-7xl lg:flex-row">
        <div className="w-full max-w-none lg:w-3/4">
          <PostArticleContent content={content} />
          <GiscusWidget />
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-32">
            <TableOfContentsSidebar headings={headings} />
          </div>
        </div>
      </div>

      <TableOfContentsModal headings={headings} />
    </PageSection>
  );
}
```

---

## Task 9: 설정 파일 정리

**Files:**
- Modify: `turbo.json`
- Modify: `apps/web/CLAUDE.md`

- [ ] **Step 1: turbo.json에서 auth 관련 env 제거**

`turbo.json`의 `build.env` 배열을 수정한다:

기존:
```json
"env": ["DATABASE_URL", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "JWT_SECRET", "ADMIN_GITHUB_ID"]
```

교체 후:
```json
"env": ["DATABASE_URL", "NEXT_PUBLIC_GISCUS_REPO", "NEXT_PUBLIC_GISCUS_REPO_ID", "NEXT_PUBLIC_GISCUS_CATEGORY", "NEXT_PUBLIC_GISCUS_CATEGORY_ID"]
```

- [ ] **Step 2: apps/web/CLAUDE.md 인증 관련 설명 제거**

`apps/web/CLAUDE.md`의 Key Patterns 섹션에서 인증 줄을 제거:

기존:
```markdown
- **인증**: GitHub OAuth → 쿠키 기반 JWT (cookies-next)
- **캐시**: revalidatePath로 서버 액션 후 무효화
```

교체 후:
```markdown
- **캐시**: revalidatePath로 서버 액션 후 무효화
```

---

## Task 10: 타입 체크 + 빌드 검증

- [ ] **Step 1: Prisma 클라이언트 재생성 (스키마 변경 후 누락된 경우)**

```bash
pnpm prisma generate
```

- [ ] **Step 2: 타입 체크**

```bash
pnpm type-check
```

Expected: 에러 없음. 에러가 있으면 삭제된 파일을 참조하는 잔여 import가 있는 것이므로 해당 파일을 찾아 수정한다.

잔여 import 찾기:
```bash
grep -r "features/auth\|features/likePost\|features/createComment\|features/editComment\|features/deleteComment\|features/createReply\|features/manageComment\|entities/comment\|entities/user\|widgets/commentSection\|widgets/likeCommentsSection\|shared/server/lib/auth\|shared/server/lib/jwt\|shared/lib/decodeToken" apps/web/src --include="*.ts" --include="*.tsx" -l
```

- [ ] **Step 3: 전체 빌드**

```bash
pnpm build
```

Expected: 빌드 성공
