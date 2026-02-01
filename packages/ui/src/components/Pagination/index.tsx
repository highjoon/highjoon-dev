import * as React from 'react';
import { cn } from '@highjoon-dev/ui/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<'a'>;

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        `flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-black transition-all cursor-pointer ${
          isActive
            ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-600 dark:bg-indigo-600 shadow-lg'
            : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:text-indigo-400'
        }`,
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      aria-label="이전 페이지로 이동"
      data-slot="pagination-previous"
      className={cn(
        `cursor-pointer flex h-10 px-4 items-center justify-center rounded-xl border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-800 text-sm font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-30 disabled:pointer-events-none`,
        className,
      )}
      {...props}>
      <ChevronLeftIcon size={16} />
      <span className="hidden sm:inline uppercase tracking-widest text-[11px]">Previous</span>
    </a>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      aria-label="다음 페이지로 이동"
      data-slot="pagination-next"
      className={cn(
        `cursor-pointer flex h-10 px-4 items-center justify-center rounded-xl border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-800 text-sm font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-30 disabled:pointer-events-none`,
        className,
      )}
      {...props}>
      <span className="hidden sm:inline uppercase tracking-widest text-[11px]">Next</span>
      <ChevronRightIcon size={16} />
    </a>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex h-10 w-10 items-center justify-center text-slate-400 dark:text-slate-600', className)}
      {...props}>
      <MoreHorizontalIcon size={16} />
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
