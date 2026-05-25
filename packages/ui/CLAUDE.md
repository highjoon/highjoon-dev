# packages/ui - UI Component Library

Radix UI 기반 shadcn/ui 스타일 컴포넌트 라이브러리. Tailwind v4 + CVA + `tw-animate-css`.

## 실행

```bash
pnpm ui storybook        # Storybook 9 + Vite (포트 6006)
pnpm ui build-storybook  # 정적 빌드
```

테스트 환경: Vitest + `@storybook/addon-vitest` + Playwright(browser mode) — Storybook 스토리를 그대로 테스트로 실행.

## Import

```tsx
import { Button } from '@highjoon-dev/ui/components/Button';
import classnames from '@highjoon-dev/ui/lib/classnames';
import '@highjoon-dev/ui/globals.css';
```

`package.json#exports`가 글로빙 패턴(`./components/**/*.tsx`, `./lib/*.ts`)으로 선언되어 있어 **신규 컴포넌트 추가 시 exports 수정 불필요**. `apps/web`는 `transpilePackages`로 직접 transpile.

## Conventions

- shadcn 패턴: `forwardRef` + `cn()` 유틸 + CVA variants
- 컴포넌트는 독립 폴더 (예: `src/components/Button/Button.tsx` + `Button.stories.tsx`)
- 스타일: Tailwind v4 (`@tailwindcss/postcss`). `apps/web`가 이 패키지의 `postcss.config`를 재사용
