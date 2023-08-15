import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { ROUTES } from '@/services/constants/routes';

const RecentPostsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-grey-900">Recent Posts</h1>
      {children}
      <div className="flex justify-end">
        <Link href={ROUTES.PAGES + '1'} className="text-grey-600 hover:text-primary-500">
          All Pages &rarr;
        </Link>
      </div>
    </div>
  );
};

export default RecentPostsLayout;
