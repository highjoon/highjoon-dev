'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  createNextRouterAdapter,
  createNextRouterAdapterWithSearchParams,
} from '@/shared/pagination/model/router.next.adapter';
import PaginationBar from '@/shared/pagination/PaginationBar';

type Props = { currentPage: number; totalPage: number; routerPath: string; useSearchParams?: boolean };

const Pagination = ({ currentPage, totalPage, routerPath, useSearchParams = false }: Props) => {
  const router = useRouter();
  const nav = useSearchParams
    ? createNextRouterAdapterWithSearchParams(router.push, routerPath)
    : createNextRouterAdapter(router.push, routerPath);

  return <PaginationBar current={currentPage} total={totalPage} nav={nav} />;
};

export default Pagination;
