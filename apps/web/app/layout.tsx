import { type PropsWithChildren } from 'react';
import localFont from 'next/font/local';
import classnames from '@highjoon-dev/ui/lib/classnames';

import { Provider } from '@/app/provider/Provider';
import { generateRootMetadata } from '@/shared/model/metadata';
import GlobalLayout from '@/shared/ui/GlobalLayout';
import Header from '@/widgets/ui/Header';

export const metadata = generateRootMetadata();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png" />
      </head>
      <body className={classnames(pretendard.className)} suppressHydrationWarning>
        <Provider>
          <Header />
          <GlobalLayout>{children}</GlobalLayout>
        </Provider>
      </body>
    </html>
  );
}

const pretendard = localFont({
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
