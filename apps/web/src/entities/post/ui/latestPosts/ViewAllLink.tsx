import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { ROUTES } from '@/shared/routes/routes';

export default function ViewAllLink() {
  return (
    <Link
      href={`${ROUTES.PAGES}/1`}
      className="flex items-center space-x-2 text-xs font-bold tracking-widest transition-all sm:text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 group">
      <span>VIEW ALL</span>
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
