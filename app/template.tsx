import { PropsWithChildren } from 'react';

import GNB from '@/components/GNB/GNB';

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <GNB />
      {children}
    </>
  );
}
