import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

interface TagProps extends LinkProps, PropsWithChildren {
  tag: string;
}

type CountProps = {
  count: number;
};

const HashTag = ({ children, tag, ...rest }: TagProps) => {
  return (
    <Link
      {...rest}
      passHref
      className="px-2 py-1 text-xs rounded-lg sm:text-sm text-primary-500 bg-primary-50 shrink-0 hover:bg-primary-100 dark:bg-grey-800 dark:hover:bg-grey-700 dark:text-primary-100">
      {tag}
      {children}
    </Link>
  );
};

const Count = ({ count }: CountProps) => {
  return <span className="ml-2 font-bold text-grey-600 dark:text-grey-100">{count}</span>;
};

HashTag.Count = Count;

export default HashTag;
