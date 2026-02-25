# packages/ui - UI Component Library

Radix UI 기반 shadcn/ui 스타일 컴포넌트 라이브러리.

## 실행

```bash
pnpm ui storybook      # Storybook 개발 서버 (포트 6006)
pnpm ui build-storybook # Storybook 정적 빌드
```

## Import

```tsx
// 컴포넌트
import { Button } from '@highjoon-dev/ui/components/Button';

// 유틸
import classnames from '@highjoon-dev/ui/lib/classnames';
import { icons } from '@highjoon-dev/ui/lib/icons';

// 글로벌 CSS
import '@highjoon-dev/ui/globals.css';
```

## Components (src/components/)

Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOtp, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, ToggleGroup, Tooltip

## Key Libraries

- **Radix UI**: 접근성 기반 headless 컴포넌트
- **CVA (class-variance-authority)**: variant 기반 스타일링
- **tailwind-merge**: Tailwind 클래스 충돌 해결
- **clsx / classnames**: 조건부 클래스
- **Lucide React**: 아이콘
- **Storybook 9.1**: 컴포넌트 문서화 & 테스트
- **Vitest**: 유닛 테스트

## Conventions

- 각 컴포넌트는 독립 폴더 (예: `src/components/Button/`)
- shadcn/ui 패턴: `forwardRef` + `cn()` 유틸 + CVA variants
- PostCSS 8.4 + Tailwind CSS 4.1
