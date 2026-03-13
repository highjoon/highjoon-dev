# highjoon-dev

개인 기술 블로그 (highjoon-dev.com). pnpm 모노레포 + Turborepo 구성.

## Tech Stack

- **Runtime**: Node >=22, pnpm 9.15.0
- **Frontend**: Next.js 14.2 (App Router), React 18.2, TypeScript 5.9
- **Backend**: Next.js API Routes, Prisma 6.3 (PostgreSQL)
- **UI**: Radix UI + Tailwind CSS 4.1, Storybook 9.1
- **Test**: Jest + React Testing Library (web), Vitest (ui)

## Monorepo Structure

```
apps/web          @highjoon-dev/web     Next.js 블로그 (프론트엔드 + API Routes)
packages/ui       @highjoon-dev/ui      Radix 기반 UI 컴포넌트 라이브러리
packages/prisma   @highjoon-dev/prisma  Prisma 스키마 & 마이그레이션
packages/types    @highjoon-dev/types   공유 TypeScript 타입
packages/config                         Prettier, TSConfig 공유 설정
```

## Commands

```bash
pnpm dev              # 전체 개발 서버 (turbo --parallel)
pnpm dev:web          # 웹 프론트엔드만
pnpm build            # 전체 빌드
pnpm test             # 전체 테스트
pnpm lint             # 전체 린트
pnpm type-check       # 전체 타입 체크
pnpm prisma generate  # Prisma 클라이언트 생성 (postinstall에도 포함)
```

## Architecture: FSD (Feature-Sliced Design)

`apps/web/src/` 는 FSD 아키텍처를 따른다:

```
app/       앱 설정 (Provider, 글로벌 스타일, 스크립트)
shared/    공유 유틸 (라우트 상수, 페이지네이션, UI, server/ 교차 도메인 유틸)
entities/  도메인 엔티티 (post, comment, tag, user, about) + 도메인별 services/schemas/lib
features/  사용자 기능 (likePost, createComment, auth, theme 등) + 기능별 services/schemas
widgets/   복합 UI 조합 (commentSection, featuredPostSection 등)
page/      페이지 컨테이너 (home, blogs, posts, tags, about, auth, error)
```

각 slice 내부 구조: `ui/` (컴포넌트), `model/` (훅/상태), `api/` (서버 액션/fetch), `lib/` (유틸), `services/` (비즈니스 로직), `schemas/` (Zod 스키마)

## Coding Conventions

- **Prettier**: singleQuote, printWidth 120, tabWidth 2, arrowParens always
- **Import 정렬**: simple-import-sort (react/next > @패키지 > @/ 내부 > 상대경로)
- **미사용 import**: unused-imports 플러그인으로 자동 제거
- **경로 별칭**: `@/*` = `apps/web/src/*`, `@highjoon-dev/ui/*` = UI 패키지
- **환경 변수**: dotenv-cli 사용 (.env.development, .env.production)
- **서버 액션**: Next.js server actions + revalidatePath 캐시 무효화
- **서비스 레이어**: 도메인별 `entities/*/services/`, `features/*/services/` - Prisma 기반 비즈니스 로직
- **교차 도메인 유틸**: `src/shared/server/` - auth, jwt, httpHandlers, handleInternalError, extractIp, serviceResponse
- **테마**: next-themes (class 기반 dark mode)
- **모달**: overlay-kit
- **토스트**: sonner
