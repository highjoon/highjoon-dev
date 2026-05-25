# apps/web - Next.js Blog Frontend

Next.js 15 (App Router) + React 19. **라우트는 `apps/web/app/`에 있고, FSD 슬라이스는 `apps/web/src/`** — 라우트 파일은 src/page 컨테이너를 import만 한다.

## Routes → Page Containers

| 라우트                      | 페이지 컨테이너                                   |
| --------------------------- | ------------------------------------------------- |
| `/`                         | `page/home/ui/HomePage.tsx`                       |
| `/blogs/[slug]`             | `page/blogs/ui/PostPage.tsx`                      |
| `/pages/[id]`               | `page/posts/ui/PostsPage.tsx`                     |
| `/tags`                     | `page/tags/ui/TagsPage.tsx`                       |
| `/tags/[name]/[page]`       | `page/tags/ui/TagDetailPage.tsx`                  |
| `/categories/[slug]/[page]` | `page/categories/ui/CategoryDetailPage.tsx`       |
| `/about`                    | `page/about/ui/AboutPage.tsx`                     |
| error                       | `page/error/ui/ErrorPage.tsx`, `NotFoundPage.tsx` |

## API Routes (`app/api/`)

| Endpoint                         | Purpose                    |
| -------------------------------- | -------------------------- |
| `GET /api/post`                  | 게시물 목록                |
| `GET /api/post/many`             | 다건 조회                  |
| `GET /api/post/featured`         | featured 게시물            |
| `GET /api/post/[slug]`           | 단건 조회                  |
| `POST /api/post/[slug]/view`     | 조회수 기록 (IP 중복 차단) |
| `GET /api/tag`, `/api/tag/[id]`  | 태그 목록 / 단건           |
| `GET /api/tag/[id]/posts`        | 태그별 게시물              |
| `GET /api/category`              | 카테고리 목록              |
| `GET /api/category/[slug]/posts` | 카테고리별 게시물          |

표준 응답: `src/shared/server/models/serviceResponse.ts` 사용. 에러는 `handleInternalError`로 래핑.

## Middleware

`apps/web/middleware.ts` — `*.vercel.app` 호스트 접근 시 `highjoon-dev.com`으로 **301 리다이렉트**. matcher는 `api/_next/static/_next/image/favicon.ico` 제외.

## next.config.mjs 핵심

- `outputFileTracingRoot: monorepo root` — Vercel 모노레포 트레이싱
- `transpilePackages: ['@highjoon-dev/ui']`
- `@prisma/nextjs-monorepo-workaround-plugin` — 서버 빌드에서 Prisma 엔진 번들링
- `images.unoptimized: true` (CloudFront에서 직접 서빙)
- `images.remotePatterns`: `dngjtjyrczhgx.cloudfront.net` 단일 허용
- `headers`: `/giscus-:theme.css`에 `Access-Control-Allow-Origin: *`

## Key Patterns

- **이미지**: CloudFront CDN (`dngjtjyrczhgx.cloudfront.net`), webp/avif
- **MDX**: `next-mdx-remote` 서버 렌더링 + `rehype-highlight`, `rehype-slug`, `remark-gfm`, `remark-toc`
- **댓글/리액션**: giscus (GitHub Discussions). 자체 댓글/좋아요 모델 없음
- **캐시**: 서버 액션 후 `revalidatePath`
- **폰트**: Pretendard (로컬 woff2)
- **모달**: overlay-kit / **토스트**: sonner / **테마**: next-themes (class 기반 dark)

## Tests

- Jest + jsdom (`jest.config.js`는 `next/jest`로 구성)
- 서버 코드 테스트는 파일 상단에 `@jest-environment node` 지시문 사용 (예: `shared/server/lib/*.test.ts`)
