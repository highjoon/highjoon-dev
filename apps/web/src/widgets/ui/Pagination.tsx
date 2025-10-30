'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { createNextRouterAdapter } from '@/shared/pagination/model/router.next.adapter';
import PaginationBar from '@/shared/pagination/PaginationBar';

type Props = { currentPage: number; totalPage: number; routerPath: string };

const Pagination = ({ currentPage, totalPage, routerPath }: Props) => {
  const router = useRouter();
  const nav = createNextRouterAdapter(router.push, routerPath);

  return <PaginationBar current={currentPage} total={totalPage} nav={nav} />;
};

export default Pagination;
