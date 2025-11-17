'use client';

import { Card, CardContent } from '@highjoon-dev/ui/components/Card';
import { Loader2 } from 'lucide-react';

import { useGithubOAuthCallback } from '@/features/auth/model/useGithubOAuthCallback';

const GithubOAuthCallbackPage = () => {
  useGithubOAuthCallback();

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md p-8">
        <CardContent className="flex flex-col items-center gap-6 p-0">
          <h1 className="text-xl font-semibold">GitHub 로그인</h1>

          <Loader2 className="size-8 animate-spin text-primary" />

          <p className="text-sm text-center text-muted-foreground">
            GitHub 계정으로 로그인 중입니다...
            <br />
            잠시만 기다려주세요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GithubOAuthCallbackPage;
