import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import './globals.css';

import Footer from '@/components/Common/Footer';
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
        <main className="flex-1 justify-between w-full h-full px-5 pt-20 md:pt-32 pb-5 flex flex-col max-w-[768px] mx-auto gap-3 md:gap-6">
          <div className="flex flex-col gap-6">
            <TabBar />
            {children}
          </div>
          <Footer />
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
