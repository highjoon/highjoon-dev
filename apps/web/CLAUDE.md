# apps/web - Next.js Blog Frontend

## Routes (App Router)

```
app/layout.tsx                   루트 레이아웃 (Pretendard 폰트, Provider)
app/page.tsx                     / 홈페이지
app/about/                       /about 소개 페이지
app/blogs/[slug]/                /blogs/:slug 개별 게시물
app/pages/[id]/                  /pages/:id 게시물 목록 (페이지네이션)
app/tags/                        /tags 태그 목록
app/tags/[name]/[page]/          /tags/:name/:page 태그별 게시물
app/auth/github/callback/        /auth/github/callback OAuth 콜백
app/error.tsx                    글로벌 에러 바운더리
app/not-found.tsx                404 페이지
app/sitemap.ts                   동적 사이트맵
app/robots.ts                    robots.txt
app/manifest.ts                  PWA manifest
```

## Page Containers (src/page/)

각 라우트의 실제 UI 로직은 `src/page/` 에 위치:

| 라우트                  | 페이지 컴포넌트                                   | 메타데이터                     |
| ----------------------- | ------------------------------------------------- | ------------------------------ |
| `/`                     | `page/home/ui/HomePage.tsx`                       | `page/home/model/metadata.ts`  |
| `/blogs/[slug]`         | `page/blogs/ui/PostPage.tsx`                      | `page/blogs/model/metadata.ts` |
| `/pages/[id]`           | `page/posts/ui/PostsPage.tsx`                     | `page/posts/model/metadata.ts` |
| `/tags`                 | `page/tags/ui/TagsPage.tsx`                       | `page/tags/model/metadata.ts`  |
| `/tags/[name]/[page]`   | `page/tags/ui/TagDetailPage.tsx`                  | 상동                           |
| `/about`                | `page/about/ui/AboutPage.tsx`                     | `page/about/model/metadata.ts` |
| `/auth/github/callback` | `page/auth/ui/GithubOAuthCallbackPage.tsx`        | -                              |
| error                   | `page/error/ui/ErrorPage.tsx`, `NotFoundPage.tsx` | -                              |

## Entities (src/entities/)

| Entity      | API                                                                                     | UI                                                                                                   | Lib                                     |
| ----------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **post**    | getAllPostsApi, getFeaturedPostApi, getPostApi, getPostContentApi, increaseViewCountApi | PostCard, FeaturedPost, PostContent, PostDetailHeader, PostBanner, TableOfContentsSidebar, ViewCount | MDXContent, extractHeadings, PostSchema |
| **comment** | getCommentsApi, getRepliesApi                                                           | Comment, Comments, Reply                                                                             | -                                       |
| **tag**     | getAllTagsApi, getPostsByTagApi                                                         | TagCard, TagList, TagBadgeList, TagButton, TagCloudContainer                                         | tag.ts                                  |
| **user**    | getLikedPostsApi                                                                        | -                                                                                                    | useGetLikedPosts                        |
| **about**   | -                                                                                       | ExperienceCard, ProfileHeader, ProjectList, SocialLinkButton                                         | career, company, profile (model)        |

## Features (src/features/)

| Feature                | 설명             | 주요 파일                                                   |
| ---------------------- | ---------------- | ----------------------------------------------------------- |
| **likePost**           | 좋아요/취소      | LikeButton, useLikePost, likePostAction, unlikePostAction   |
| **createComment**      | 댓글 작성        | CommentInput, useCommentInput, createCommentAction          |
| **createReply**        | 대댓글 작성      | ReplyInput, createReplyAction                               |
| **deleteComment**      | 댓글/대댓글 삭제 | deleteCommentAction, deleteReplyAction                      |
| **editComment**        | 댓글 수정        | CommentEditArea, updateCommentAction                        |
| **manageComment**      | 댓글 옵션 메뉴   | CommentOptions                                              |
| **filterTagsBySearch** | 태그 검색 필터   | TagSearchInput, useTagSearch                                |
| **auth**               | GitHub OAuth     | githubLoginAction, useSignIn, RequiredSignIn, SignOutButton |
| **theme**              | 다크모드 토글    | ThemeToggle                                                 |

## Widgets (src/widgets/)

| Widget              | 파일                                                            | 설명                    |
| ------------------- | --------------------------------------------------------------- | ----------------------- |
| commentSection      | CommentSection.tsx                                              | 댓글 영역 전체          |
| likeCommentsSection | LikeCommentsSection.tsx                                         | 좋아요 + 댓글 통합 섹션 |
| featuredPostSection | FeaturedPostSection.tsx                                         | 추천 게시물             |
| introSection        | IntroSection.tsx                                                | 홈 인트로               |
| latestPostsSection  | LatestPostsSection.tsx                                          | 최신 게시물 목록        |
| (공통 UI)           | Header, Footer, MobileMenu, SearchBar, SearchDialog, Pagination | 레이아웃 위젯           |

## Shared (src/shared/)

```
api/              API 클라이언트 (serverApi, clientApi, parseApiError)
lib/              JWT 디코딩 등 유틸
model/            theme, metadata 생성, 외부 링크 상수
pagination/       buildPageItems, usePagination
routes/           ROUTES 상수 (HOME, PAGES, BLOGS, TAGS, ABOUT)
ui/               GlobalLayout, Navigation, Logo, ConfirmModal
ui/layout/        EmptyState, PageHeader, PageSection, PostGrid
```

## Key Patterns

- 이미지: CloudFront CDN (`dngjtjyrczhgx.cloudfront.net`)
- MDX: next-mdx-remote로 서버에서 렌더링, rehype-highlight/rehype-slug 적용
- 인증: 쿠키 기반 JWT (cookies-next), GitHub OAuth
- 캐시: revalidatePath로 서버 액션 후 무효화
- 폰트: Pretendard (로컬 woff2)
