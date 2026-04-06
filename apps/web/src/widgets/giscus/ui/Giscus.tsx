'use client';

import { useTheme } from 'next-themes';
import Giscus from '@giscus/react';

export default function GiscusWidget() {
  const { resolvedTheme } = useTheme();

  // resolvedTheme is undefined until mounted — avoids SSR mismatch
  if (!resolvedTheme) return null;

  const origin = window.location.origin;
  const isDark = resolvedTheme === 'dark';

  // Custom CSS requires HTTPS — giscus.app (HTTPS) blocks mixed content from HTTP origins.
  // Fall back to built-in theme on HTTP (local dev).
  const theme = origin.startsWith('https://')
    ? `${origin}/giscus-${isDark ? 'dark' : 'light'}.css`
    : isDark
      ? 'dark'
      : 'light';

  return (
    <Giscus
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="ko"
      loading="lazy"
    />
  );
}
