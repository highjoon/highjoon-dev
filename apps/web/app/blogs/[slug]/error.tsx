'use client';

import PostNotFound from '@/entities/post/ui/PostNotFound';
import GlobalErrorPage from '@/page/error/ui/ErrorPage';
import { parseApiError } from '@/shared/api/lib/parseApiError';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Page({ error, reset }: Props) {
  const serviceResponse = parseApiError(error);
  const statusCode = serviceResponse?.statusCode;

  switch (statusCode) {
    case 404:
      return <PostNotFound />;
    default:
      return <GlobalErrorPage error={error} reset={reset} />;
  }
}
