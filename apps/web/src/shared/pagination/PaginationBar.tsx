'use client';

import React from 'react';
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@highjoon-dev/ui/components/Pagination';

import { DISABLED_PAGINATION_ITEM } from './model/classnames';
import type { NavigationPort } from './model/navigation.port';
import { usePagination } from './usePagination';

type Props = {
  current: number;
  total: number;
  siblingCount?: number;
  nav: NavigationPort;
};

export default function PaginationBar({ current, total, siblingCount = 1, nav }: Props) {
  const { items, isFirst, isLast, goPrev, goNext, goTo } = usePagination({ current, total, siblingCount, nav });

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size="default"
            className={isFirst ? DISABLED_PAGINATION_ITEM : undefined}
            onClick={(e) => {
              e.preventDefault();
              goPrev();
            }}
          />
        </PaginationItem>
        {items.map((item, index) => (
          <PaginationItem key={typeof item === 'number' ? `p-${item}` : `e-${index}`}>
            {item === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                size="icon"
                isActive={item === current}
                onClick={(e) => {
                  e.preventDefault();
                  if (item !== current) goTo(item as number);
                }}>
                {item as number}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            size="default"
            className={isLast ? DISABLED_PAGINATION_ITEM : undefined}
            onClick={(e) => {
              e.preventDefault();
              goNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
