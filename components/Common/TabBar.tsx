'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { TAB_NAME } from '@/constants/tab';

const Tab = ({ href, tabName, isActive }: { href: string; tabName: string; isActive: boolean }) => {
  return (
    <Link
      href={href}
      className={`flex-1 py-2 text-center border-t-2 ${
        isActive
          ? 'border-t-primary-500 text-primary-500'
          : 'border-t-grey-100 text-grey-400 dark:text-white dark:border-t-white'
      }`}>
      <li className="text-xl font-bold">{tabName}</li>
    </Link>
  );
};

const TabBar = () => {
  const pathname = usePathname();

  if (!pathname || pathname?.includes(ROUTES.BLOGS)) return null;

  return (
    <ul className="flex items-center justify-between w-full">
      <Tab
        href={ROUTES.PAGES + '1'}
        tabName={TAB_NAME.POSTS}
        isActive={pathname !== ROUTES.HOME && (pathname?.includes(ROUTES.PAGES) || ROUTES.PAGES.includes(pathname))}
      />
      <Tab
        href={ROUTES.TAGS}
        tabName={TAB_NAME.TAGS}
        isActive={pathname !== ROUTES.HOME && (pathname?.includes(ROUTES.TAGS) || ROUTES.TAGS.includes(pathname))}
      />
      <Tab
        href={ROUTES.ABOUT}
        tabName={TAB_NAME.ABOUT}
        isActive={pathname !== ROUTES.HOME && (pathname?.includes(ROUTES.ABOUT) || ROUTES.ABOUT.includes(pathname))}
      />
    </ul>
  );
};

export default TabBar;
