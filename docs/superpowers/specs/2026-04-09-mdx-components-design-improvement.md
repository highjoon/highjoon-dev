# MDX Components 디자인 개선 스펙

**날짜**: 2026-04-09  
**범위**: `apps/web/src/entities/post/lib/mdx/MdxComponents.tsx`  
**방향**: 개발자 블로그 느낌 (Option A: Polished Developer)

---

## 목표

현재 MdxComponents의 타이포그래피, 코드 블록, blockquote 스타일을 개발자 블로그 미감(Josh Comeau, Leerob 스타일)으로 개선한다. 브랜드 색상 시스템(`vibrant-*`)은 유지한다.

---

## 섹션 1: 타이포그래피

### `<p>` (본문 단락)
- `text-vibrant-text-muted` → `text-vibrant-text-main` (가독성 개선)
- `leading-7` → `leading-8` (줄 간격 확대)
- `my-1` → `my-3` (문단 간 여백 확보)

### `<li>` (리스트 아이템)
- `list-inside` → `list-outside` (ul, ol 모두)
- `ul`: `list-disc list-inside space-y-1 sm:pl-2.5` → `list-disc list-outside pl-5 space-y-2`
- `ol`: `list-decimal list-inside space-y-1` → `list-decimal list-outside pl-5 space-y-2`
- `li`: `my-1 leading-7 pr-5` → `my-1 leading-8` (pr-5 제거, leading 맞춤)

### `<h2>` (섹션 헤딩)
- Separator 마진: `my-8 md:my-7 sm:my-5` → `mt-12 mb-0 md:mt-10 sm:mt-8`
- h2 마진: `mb-8 md:mb-3 sm:mb-3` → `mt-4 mb-6 md:mt-3 md:mb-4`

### `<h3>` (서브 헤딩)
- 마진: `mt-5 mb-5 md:mt-3 md:mb-3 sm:mt-3 sm:mb-3` → `mt-8 mb-4 md:mt-6 md:mb-3`

---

## 섹션 2: 코드 블록

### `<pre>` (블록 코드)
- 구조 변경: pre 내부에 상단 dot 장식바(macOS 터미널 느낌)를 렌더링하는 wrapper 구조로 변경
- dot 바: `bg-gray-800 dark:bg-gray-900` 배경 + 빨강/노랑/초록 원 (`#FF5F57`, `#FEBC2E`, `#28C840`)
- `rounded-lg` → `rounded-xl`
- `border border-gray-800 dark:border-gray-700` 추가
- padding: `p-4` → dot 바 포함 구조로 조정 (`pt-0 px-0 pb-0`, 내부 코드 영역에 `px-4 pb-4 pt-3`)

### `<code>` (인라인 코드)
- 현재: 배경색 없음
- 변경: `bg-gray-100 dark:bg-gray-800 text-vibrant-brand rounded px-1.5 py-0.5 text-sm font-mono font-medium`

---

## 섹션 3: Blockquote / Callout

### `<blockquote>`
- 좌측 border: `border-l-4` → `border-l-[3px]`
- 배경: `bg-vibrant-brand-light/30` → `bg-vibrant-brand-light/20 dark:bg-vibrant-brand/10`
- 모서리: `rounded-r-lg` → `rounded-r-xl`
- Info 아이콘: `w-5 h-5` → `w-4 h-4`
- 내부 텍스트 컨테이너: `italic` 추가

---

## 구현 파일

- `apps/web/src/entities/post/lib/mdx/MdxComponents.tsx` — 모든 변경사항 적용

---

## 비고

- `prose` 관련 Tailwind 클래스(`PostArticleContent.tsx`)는 변경하지 않음
- 브랜드 색상 토큰(`vibrant-*`)은 그대로 유지
- 다크모드 대응 필수
