import React from 'react';
import Link from 'next/link';
import { Button } from '@highjoon-dev/ui/components/Button';

import { ROUTES } from '@/shared/routes/routes';

export default function ViewAllPostsButton() {
  return (
    <div className="flex justify-center">
      <Button asChild variant="outline">
        <Link href={`${ROUTES.PAGES}/1`}>게시물 전체 보기</Link>
      </Button>
    </div>
  );
}
