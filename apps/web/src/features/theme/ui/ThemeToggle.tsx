'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="w-10 h-10 rounded-2xl" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 rounded-2xl hover:text-indigo-600 dark:hover:text-indigo-400"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
