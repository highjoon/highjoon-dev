'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Pagination as MantinePagination } from '@mantine/core';
import { ROUTES } from '@/constants/routes';
import { posts } from '@/data/posts';

export const POSTS_PER_PAGE = 9;

type Props = { currentPage: number };

const Pagination = ({ currentPage }: Props) => {
  const router = useRouter();

  return (
    <MantinePagination
      value={currentPage}
      total={Math.ceil(posts.length / POSTS_PER_PAGE)}
      onChange={(value) => router.push(`${ROUTES.PAGES}/${value}`)}
      mx="auto"
      mt="auto"
    />
  );
};

export default Pagination;
