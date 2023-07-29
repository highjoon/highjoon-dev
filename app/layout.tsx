import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

import GNB from '@/components/GNB/GNB';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'highJoon.dev',
  description: "highJoon's dev-log",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <GNB />
        <main className="w-full px-5 pt-40 pb-20">{children}</main>
      </body>
    </html>
  );
}
