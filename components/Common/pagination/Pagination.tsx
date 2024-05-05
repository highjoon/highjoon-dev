'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Pagination as MantinePagination } from '@mantine/core';

export const POSTS_PER_PAGE = 9;

type Props = { currentPage: number; totalPage: number; routerPath: string };

const Pagination = ({ currentPage, totalPage, routerPath }: Props) => {
  const router = useRouter();

  return (
    <MantinePagination
      value={currentPage}
      total={totalPage}
      onChange={(value) => router.push(`${routerPath}/${value}`)}
      mx="auto"
      mt="auto"
    />
  );
};

export default Pagination;
