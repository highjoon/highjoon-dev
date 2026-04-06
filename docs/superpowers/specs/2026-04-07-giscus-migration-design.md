# giscus 마이그레이션 설계

**날짜:** 2026-04-07  
**목표:** 커스텀 DB 기반 인증/댓글/좋아요 시스템을 giscus(GitHub Discussions)로 전환

---

## 배경

현재 블로그는 GitHub OAuth + JWT 인증, PostgreSQL/Prisma 기반 댓글(3단 중첩 답글)과 좋아요 시스템을 완전히 커스텀 구현하여 운영 중이다. 이를 유지보수 부담이 적은 giscus 오픈소스로 대체한다.

---

## 결정 사항

- **giscus 채택** (utterances 대신) — Discussions 기반으로 스레딩 지원, 리액션 내장, 활발한 유지보수
- **기존 데이터 마이그레이션 없음** — 새로 시작
- **좋아요도 giscus 리액션으로 대체** — 커스텀 LikeButton 완전 제거
- **인증 시스템 완전 제거** — 댓글/좋아요 전용으로만 사용됐으므로
- **DB 유지** — 조회수 추적(PostViewLog, PostViewStats)은 계속 사용

---

## 제거 대상

### Features (전체 삭제)
- `features/auth/` — GitHub OAuth + JWT 인증 전체
- `features/likePost/` — 좋아요/좋아요 취소
- `features/createComment/` — 댓글 작성
- `features/editComment/` — 댓글 수정
- `features/deleteComment/` — 댓글 삭제
- `features/createReply/` — 답글 작성
- `features/manageComment/` — 댓글 관리 옵션

### Entities (삭제)
- `entities/comment/` — 전체
- `entities/user/` — 전체
- `entities/post/services/postLike.service.ts`
- `entities/post/services/postLike.service.test.ts` (있다면)

### Widgets (삭제 + 교체)
- `widgets/commentSection/` — 삭제
- `widgets/likeCommentsSection/` — giscus 위젯으로 교체

### API Routes (삭제)
- `app/api/auth/**`
- `app/api/comment/**`
- `app/api/post/[slug]/like/`
- `app/api/post/[slug]/unlike/`
- `app/api/user/**`

### Shared (삭제)
- `shared/server/lib/auth.ts`
- `shared/server/lib/jwt.ts`

### Prisma
- `User` 모델 삭제
- `Comment` 모델 삭제
- `PostLike` 모델 삭제
- `Post.likeCount` 필드 삭제
- `Post`와 위 모델들의 relation 필드 삭제
- 마이그레이션 생성 및 적용

### 환경 변수 (turbo.json에서 제거)
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `JWT_SECRET`, `ADMIN_GITHUB_ID`

### Dependencies (package.json에서 제거)
- `jsonwebtoken`, `@types/jsonwebtoken`
- `cookies-next`
- `jose` (사용 중인 경우)

---

## 추가 대상

### giscus 위젯
- `widgets/giscus/ui/Giscus.tsx` — `@giscus/react` 패키지 사용
- 현재 `features/theme/` 의 다크/라이트 테마와 연동 (giscus `theme` prop)
- 포스트 slug 기반 Discussion 매핑: `mapping="pathname"` 사용

### 포스트 상세 페이지 연결
- `widgets/likeCommentsSection/` 대신 `widgets/giscus/` 를 PostPage에 연결

### giscus 설정 (giscus.app 에서 완료 필요)
- GitHub repo에서 Discussions 탭 활성화
- giscus.app에서 repo 연결 + category 선택 (예: General 또는 별도 Comments 카테고리)
- 생성된 `data-repo`, `data-repo-id`, `data-category`, `data-category-id` 를 환경 변수 또는 상수로 관리

---

## 데이터 플로우 (After)

```
포스트 페이지 로드
    ↓
PostPage → GiscusWidget
    ↓
@giscus/react 컴포넌트 렌더링
    ↓
GitHub Discussions API (iframe 내부)
    ↓
사용자가 GitHub 계정으로 직접 로그인 → 댓글 작성/리액션
```

---

## 유지되는 것

- `packages/prisma/` — Post, Tag, PostViewLog, PostViewStats 모델 유지
- `app/api/post/[slug]/views/` — 조회수 API 유지
- `entities/post/` — postLike.service 제외하고 유지
- `entities/tag/`, `entities/about/` — 변경 없음
- `features/theme/` — 테마 기능 유지 (giscus 테마 연동에 활용)

---

## 구현 순서

1. giscus 의존성 설치 (`@giscus/react`)
2. Prisma 스키마 수정 (User, Comment, PostLike 제거) + 마이그레이션
3. 삭제 대상 코드 제거 (features, entities, API routes, shared)
4. GiscusWidget 컴포넌트 구현 및 테마 연동
5. PostPage에 GiscusWidget 연결
6. 환경 변수 및 turbo.json 정리
7. 타입 체크 + 빌드 확인
