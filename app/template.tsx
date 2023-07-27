import { PropsWithChildren } from 'react';

import Header from '@/components/Header/Header';

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
