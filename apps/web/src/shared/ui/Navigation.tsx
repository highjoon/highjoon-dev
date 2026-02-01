'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type NavigationItem } from '@/widgets/model/navigation';

interface NavigationProps {
  items: NavigationItem[];
}

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`) || pathname.startsWith(href.replace(/\/\d+$/, ''));
}

export default function Navigation({ items }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center space-x-10 text-[13px] font-bold tracking-wider md:flex">
      {items.map((item) => {
        const isActive = isActiveRoute(pathname, item.href);
        return (
          <Link
            key={item.title}
            href={item.href}
            className={`relative transition-colors group ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'
            }`}>
            {item.title}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all dark:bg-indigo-400 ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
