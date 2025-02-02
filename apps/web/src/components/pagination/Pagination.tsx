'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pagination as MantinePagination } from '@mantine/core';

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
