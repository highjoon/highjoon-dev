import Link from 'next/link';
import { Button } from '@highjoon-dev/ui/components/Button';

import { ROUTES } from '@/shared/routes/routes';

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-20 px-4">
      <div className="text-center">
        <div className="mb-6 text-4xl font-medium leading-none text-muted-foreground sm:text-5xl">404</div>
        <h1 className="mb-6 text-3xl font-medium text-center sm:text-4xl">이 게시물을 찾을 수 없습니다</h1>
        <p className="mx-auto mb-8 max-w-[500px] text-lg text-center text-muted-foreground">
          요청하신 게시물이 존재하지 않거나 삭제되었을 수 있습니다.
          <br />
          주소를 확인하시거나 다른 게시물을 찾아보세요.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href={ROUTES.BLOGS}>게시물 목록으로</Link>
          </Button>
          <Button asChild>
            <Link href={ROUTES.HOME}>홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
