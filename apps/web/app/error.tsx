'use client';

import GlobalErrorPage from '@/page/error/ui/ErrorPage';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Page({ error, reset }: Props) {
  return <GlobalErrorPage error={error} reset={reset} />;
}
