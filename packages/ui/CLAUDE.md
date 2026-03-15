# packages/ui - UI Component Library

Radix UI 기반 shadcn/ui 스타일 컴포넌트 라이브러리.

## 실행

```bash
pnpm ui storybook        # Storybook 개발 서버 (포트 6006)
pnpm ui build-storybook  # Storybook 정적 빌드
```

## Import

```tsx
import { Button } from '@highjoon-dev/ui/components/Button';
import classnames from '@highjoon-dev/ui/lib/classnames';
import '@highjoon-dev/ui/globals.css';
```

## Conventions

- shadcn/ui 패턴: `forwardRef` + `cn()` 유틸 + CVA variants
- 각 컴포넌트는 독립 폴더 (예: `src/components/Button/`)
- apps/web에서 이 패키지의 postcss.config와 tailwind.config를 확장하여 사용
