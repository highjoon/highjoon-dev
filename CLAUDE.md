# highjoon-dev

개인 기술 블로그 (highjoon-dev.com). pnpm 모노레포 + Turborepo 구성.

- Node `>=22`, pnpm `9.15.0`, packageManager 고정
- Vercel 배포 (`apps/web`만 빌드)

## Monorepo Structure

```
apps/web          @highjoon-dev/web     Next.js 15 블로그 (App Router + API Routes)
packages/ui       @highjoon-dev/ui      Radix + shadcn 스타일 컴포넌트 (Storybook 9 / Vite)
packages/prisma   @highjoon-dev/prisma  Prisma 스키마 & 마이그레이션
packages/types    @highjoon-dev/types   공유 TypeScript 타입
packages/config                         Prettier, TSConfig 공유 설정
```

## Commands

```bash
pnpm dev              # 전체 개발 서버 (turbo --parallel)
pnpm web dev          # 웹 프론트엔드만
pnpm build            # 전체 빌드
pnpm test             # 전체 테스트 (apps/web jest)
pnpm lint             # ESLint (apps/web만 대상)
pnpm type-check       # 전체 타입 체크
pnpm prisma generate  # Prisma 클라이언트 생성 (postinstall에도 포함)
```

패키지 필터 단축: `pnpm web <cmd>`, `pnpm ui <cmd>`, `pnpm prisma <cmd>`

## Git Hooks

- **pre-commit**: `pnpm type-check && pnpm exec lint-staged`
- **lint-staged**: `*.{js,jsx,ts,tsx}` → eslint --fix + prettier --write
- **commit-msg**: `commitlint --edit` — 커밋 메시지 컨벤션 검증 (아래 참고)

## Commit Convention

[Conventional Commits](https://www.conventionalcommits.org) 형식. `commitlint.config.mjs`(extends `@commitlint/config-conventional`)로 강제하며 commit-msg 훅에서 검증한다.

```
<type>(<scope>)?: <설명>      # scope는 선택

<본문>                        # 선택. 변경점이 여러 개면 "- " 불릿, 이유 설명은 산문
```

- **type**: `feat` `fix` `chore` `docs` `refactor` `perf` `style` `test` `build` `ci` `revert`
- **scope**: 선택. 도메인/슬라이스 단위로만 사용 (`category`, `post`, `api`, `prisma` 등). 패키지 경로 표기(`(web)` 등)는 지양하고, 해당 패키지명은 설명에 녹인다 (예: `feat: drizzle ...`)
- **설명**: 한국어. 한글·영문 고유명사 혼용 허용 (`subject-case` 검사 비활성화), 제목 끝 마침표 없음, 헤더 100자 이내
- 커밋/PR에 `Co-Authored-By` 넣지 않는다

```
feat: drizzle 도메인별 스키마 및 클라이언트/설정 정비
feat(category): findAllCategories 서비스 구현
fix: Sentry environment를 production/preview/development로 정규화
```

## Architecture: FSD (Feature-Sliced Design)

`apps/web/src/` 는 FSD 아키텍처를 따른다. **Next App Router 파일(`page.tsx`, `route.ts`)은 `apps/web/app/`에 위치**하며 src/page 컨테이너를 import해 렌더한다.

```
app/       앱 설정 (Provider, GlobalStyles, AppScripts, GA, WebsiteSchema)
shared/    공유 유틸 (routes 상수, pagination, ui, server/ 교차 도메인 유틸)
entities/  도메인 엔티티 (about, category, giscus, post, tag)
features/  사용자 기능 (filterTagsBySearch, theme)
widgets/   복합 UI 조합 (featuredPostSection, latestPostsSection, introSection, giscus, ui/Header·Footer 등)
page/      페이지 컨테이너 (home, blogs, posts, tags, categories, about, error)
```

> 댓글/리액션은 [giscus](https://giscus.app)로 외주화 — `User`, `Comment`, `PostLike` 모델은 모두 제거됨. 자체 인증 로직 없음.

## Coding Conventions

- **Import 정렬**: simple-import-sort (react/next > @패키지 > @/ 내부 > 상대경로)
- **미사용 import**: unused-imports 플러그인으로 자동 제거
- **경로 별칭**: `@/*` = `apps/web/src/*`, `@highjoon-dev/ui/*` = UI 패키지 (`transpilePackages`로 빌드)
- **환경 변수**: 각 패키지의 `.env`를 Next.js / Prisma CLI가 자동 로드
- **서버 액션**: Next.js server actions + `revalidatePath`로 캐시 무효화
- **서비스 레이어**: `entities/*/services/`, `features/*/services/` — Prisma 기반 비즈니스 로직, 도메인별 폴더
- **교차 도메인 유틸**: `src/shared/server/lib/` (extractIp, handleInternalError, httpHandlers), `src/shared/server/models/` (serviceResponse)

## Environment Variables

`turbo.json` build env로 선언된 키:

- `DATABASE_URL` — Prisma 연결 (PostgreSQL)
- `GITHUB_TOKEN` — giscus API 호출 (`entities/giscus/services`)
- `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID` — giscus 위젯 설정
- `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN` — Sentry 클라이언트/서버 DSN
- `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` — 빌드 시 source map 업로드용
