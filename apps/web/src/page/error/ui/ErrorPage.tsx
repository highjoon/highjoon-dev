import React from 'react';
import Link from 'next/link';
import { Button } from '@highjoon-dev/ui/components/Button';
import { AlertCircle, Home, RotateCw } from 'lucide-react';

import { ROUTES } from '@/shared/routes/routes';

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-20 px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <AlertCircle className="size-12 text-destructive" />
        <h1 className="text-2xl font-semibold">문제가 발생했습니다</h1>
        <p className="text-sm text-muted-foreground">잠시 후 다시 시도해주세요</p>
        {error?.message && <p className="text-sm text-muted-foreground">{error.message}</p>}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={reset}>
            <RotateCw className="mr-2 size-4" />
            다시 시도
          </Button>
          <Button asChild variant="outline">
            <Link href={ROUTES.HOME}>
              <Home className="mr-2 size-4" />
              홈으로 가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
