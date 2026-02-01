import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/shared/routes/routes';

export default function Logo() {
  return (
    <Link href={ROUTES.HOME} className="flex items-center cursor-pointer group">
      <div className="relative flex items-center justify-center w-10 h-10 mr-3 overflow-hidden transition-transform shadow-lg bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl group-hover:rotate-12 shadow-indigo-200 dark:shadow-indigo-500/20">
        <Image src="/images/img-profile.png" width={28} height={28} alt="profile" className="object-cover" />
      </div>
      <span className="text-xl font-black tracking-tight text-transparent transition-colors bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text dark:from-slate-100 dark:to-slate-400">
        HIGHJOON-DEV
      </span>
    </Link>
  );
}
