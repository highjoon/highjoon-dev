import Link from 'next/link';
import { PropsWithChildren } from 'react';

const RecentPostsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      <h1 className="text-5xl font-bold text-grey-900">Recent Posts</h1>
      {children}
      <div className="flex justify-end">
        <Link href={'/pages/1'} className="text-grey-600 hover:text-primary-500">
          All Pages &rarr;
        </Link>
      </div>
    </div>
  );
};

export default RecentPostsLayout;
