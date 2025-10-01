import { type PropsWithChildren } from 'react';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ColorSchemeScript } from '@mantine/core';
import classnames from '@highjoon-dev/ui/lib/classnames';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Provider } from '@/app/provider';
import GoogleAdsense from '@/components/googleAdsense/GoogleAdsense';
import WebsiteSchema from '@/components/structuredData/WebsiteSchema';
import { generateRootMetadata } from '@/shared/model/metadata';
import GlobalLayout from '@/shared/ui/GlobalLayout';
import Header from '@/widgets/ui/Header';

export const metadata = generateRootMetadata();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
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
        <WebsiteSchema />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XW8LXFXK6N`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XW8LXFXK6N');
        `}
        </Script>
        <Analytics />
        <SpeedInsights />
        <GoogleAdsense />
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
