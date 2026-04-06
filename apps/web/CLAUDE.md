# apps/web - Next.js Blog Frontend

## Routes → Page Containers

App Router 라우트와 FSD `src/page/` 컨테이너 매핑:

| 라우트                | 페이지 컨테이너                            |
| --------------------- | ------------------------------------------ |
| `/`                   | `page/home/ui/HomePage.tsx`                |
| `/blogs/[slug]`       | `page/blogs/ui/PostPage.tsx`               |
| `/pages/[id]`         | `page/posts/ui/PostsPage.tsx`              |
| `/tags`               | `page/tags/ui/TagsPage.tsx`                |
| `/tags/[name]/[page]` | `page/tags/ui/TagDetailPage.tsx`           |
| `/about`              | `page/about/ui/AboutPage.tsx`              |
| error                 | `page/error/ui/ErrorPage.tsx`, `NotFoundPage.tsx` |

## Key Patterns

- **이미지**: CloudFront CDN (`dngjtjyrczhgx.cloudfront.net`), webp/avif 포맷
- **MDX**: next-mdx-remote로 서버에서 렌더링, rehype-highlight/rehype-slug 적용
- **댓글/리액션**: giscus (GitHub Discussions 기반)
- **캐시**: revalidatePath로 서버 액션 후 무효화
- **폰트**: Pretendard (로컬 woff2)
- **모달**: overlay-kit
- **토스트**: sonner
- **테마**: next-themes (class 기반 dark mode)
