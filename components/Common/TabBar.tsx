'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/services/constants/routes';

const TabBar = () => {
  const pathname = usePathname();
  console.log(pathname, ROUTES.PAGES);
  return (
    <ul className="flex items-center justify-between w-full">
      <Link
        href={ROUTES.HOME}
        className={`flex-1 py-2 text-center border-t-2 ${
          pathname === ROUTES.HOME || pathname.includes(ROUTES.PAGES)
            ? 'border-t-primary-500 text-primary-500'
            : 'border-t-grey-100 text-grey-400'
        }`}>
        <li className="text-xl font-bold">Posts</li>
      </Link>
      <Link
        href={ROUTES.TAGS}
        className={`flex-1 py-2 text-center border-t-2 ${
          pathname === ROUTES.TAGS ? 'border-t-primary-500 text-primary-500' : 'border-t-grey-100 text-grey-400'
        }`}>
        <li className="text-xl font-bold">Tags</li>
      </Link>
      <Link
        href={ROUTES.ABOUT}
        className={`flex-1 py-2 text-center border-t-2 ${
          pathname === ROUTES.ABOUT ? 'border-t-primary-500 text-primary-500' : 'border-t-grey-100 text-grey-400'
        }`}>
        <li className="text-xl font-bold">About</li>
      </Link>
    </ul>
  );
};

export default TabBar;
