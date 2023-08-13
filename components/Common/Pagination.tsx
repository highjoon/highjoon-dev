import Link from 'next/link';

type Props = {
  currentPageNumber: number;
  nextPageLink: string;
  prevPageLink?: string;
  hasNextPage?: boolean;
};

const Pagination = ({ currentPageNumber, nextPageLink, prevPageLink, hasNextPage }: Props) => {
  return (
    <div className="flex items-center justify-between">
      {currentPageNumber > 1 && !!prevPageLink ? (
        <Link href={prevPageLink} className="text-grey-600 hover:text-primary-500">
          &larr; Page {currentPageNumber - 1}
        </Link>
      ) : (
        <div />
      )}
      <span className="font-bold text-grey-900">Page {currentPageNumber}</span>
      {!!hasNextPage ? (
        <Link href={nextPageLink} className="text-grey-600 hover:text-primary-500">
          Page {currentPageNumber + 1} &rarr;
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Pagination;
