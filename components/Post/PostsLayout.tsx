import Link from 'next/link';
import { PropsWithChildren } from 'react';
import Pagination from '../Common/Pagination';

import { ROUTES } from '@/services/constants/routes';

interface Props extends PropsWithChildren {
  title: string;
}

const PostsLayout = ({ title, children }: Props) => {
  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-grey-900">{title}</h1>
      {children}
      <Pagination>
        <Pagination.AllPages />
      </Pagination>
    </div>
  );
};

export default PostsLayout;
