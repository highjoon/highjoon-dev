import React from 'react';
import Link from 'next/link';
import { Button } from '@highjoon-dev/ui/components/Button';

import { ROUTES } from '@/shared/routes/routes';

interface Props {
  isActive?: boolean;
}

export default function AllTopicsButton({ isActive = false }: Props) {
  return (
    <Button
      asChild
      variant="outline"
      className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border ${
        isActive
          ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
          : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-600 hover:text-indigo-600 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-700 dark:hover:text-indigo-400'
      }`}>
      <Link href={ROUTES.TAGS}>ALL TOPICS</Link>
    </Button>
  );
}
