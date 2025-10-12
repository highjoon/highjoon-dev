import React from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';

import { ROUTES } from '@/shared/routes/routes';

export default function ViewAllPostsButton() {
  return (
    <Link className="m-auto" href={`${ROUTES.PAGES}/1`}>
      <Button variant="default">게시물 전체 보기</Button>
    </Link>
  );
}
