import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import './globals.css';

import GNB from '@/components/Common/GNB';
import TabBar from '@/components/Common/TabBar';

export const metadata: Metadata = {
  title: 'highJoon.dev',
  description: "highJoon's dev-log",
  icons: {
    icon: '/favicon/apple-icon.png',
    shortcut: '/favicon/apple-icon.png',
    apple: '/favicon/apple-icon.png',
    other: {
      rel: '/favicon/apple-icon-precomposed',
      url: '/favicon/apple-icon-precomposed.png',
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className={pretendard.className} suppressHydrationWarning>
        <GNB />
        <main className="w-full px-5 pt-20 pb-20 sm:pt-32 md:pb-40 md:pt-40">
          <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
            <TabBar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

export const pretendard = localFont({
  src: '../public/fonts/pretendard.woff2',
  display: 'swap',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});
