import Link from 'next/link';
import { PropsWithChildren } from 'react';

type CurrentPageProps = {
  currentPageNumber: number;
};

type PrevPageLinkProps = {
  prevPageLink?: string;
  currentPageNumber: number;
};

type NextPageLinkProps = {
  hasNextPage?: boolean;
  nextPageLink: string;
  currentPageNumber: number;
};

const Pagination = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

const CurrentPage = ({ currentPageNumber }: CurrentPageProps) => {
  return <span className="font-bold text-grey-900 dark:text-white">Page {currentPageNumber}</span>;
};

const PrevPageLink = ({ prevPageLink, currentPageNumber }: PrevPageLinkProps) => {
  if (currentPageNumber <= 1 || !prevPageLink) {
    return <div className="flex-1" />;
  }

  return (
    <Link
      href={prevPageLink}
      className="flex justify-start flex-1 text-grey-600 hover:text-primary-500 dark:text-white dark:hover:text-primary-500">
      &larr; Page {currentPageNumber - 1}
    </Link>
  );
};

const NextPageLink = ({ hasNextPage, nextPageLink, currentPageNumber }: NextPageLinkProps) => {
  if (!hasNextPage) {
    return <div className="flex-1" />;
  }

  return (
    <Link
      href={nextPageLink}
      className="flex justify-end flex-1 text-grey-600 hover:text-primary-500 dark:text-white dark:hover:text-primary-500">
      Page {currentPageNumber + 1} &rarr;
    </Link>
  );
};

Pagination.CurrentPage = CurrentPage;
Pagination.PrevPageLink = PrevPageLink;
Pagination.NextPageLink = NextPageLink;

export default Pagination;
