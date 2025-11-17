import React from 'react';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Card, CardContent } from '@highjoon-dev/ui/components/Card';
import { Github } from 'lucide-react';

import { useSignIn } from '@/features/auth/model/useSignIn';

const RequiredSignIn = () => {
  const { signIn } = useSignIn();

  return (
    <Card className="w-full p-3">
      <CardContent className="flex h-[100px] flex-col items-center justify-center gap-3 p-0">
        <p className="text-sm">로그인 후 댓글을 작성해주세요.</p>
        <Button size="lg" variant="outline" onClick={signIn}>
          <Github className="mr-2 size-5" />
          GitHub로 로그인
        </Button>
      </CardContent>
    </Card>
  );
};

export default RequiredSignIn;
