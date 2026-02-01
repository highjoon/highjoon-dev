import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/shared/routes/routes';

interface Props {
  name: string;
  isActive?: boolean;
}

export default function TagButton({ name, isActive = false }: Props) {
  return (
    <Link
      href={`${ROUTES.TAGS}/${encodeURIComponent(name)}/1`}
      className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border ${
        isActive
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md dark:shadow-none'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-indigo-600 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-indigo-400'
      }`}>
      #{name}
    </Link>
  );
}
