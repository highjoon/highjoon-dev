'use client';

import ErrorPage from '@/page/error/ui/ErrorPage';

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: Props) {
  return <ErrorPage error={error} reset={reset} />;
}
