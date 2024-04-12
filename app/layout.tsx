import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classnames from 'classnames';
import Footer from '@/components/Common/footer/Footer';
import Header from '@/components/Common/header/Header';
import Provider from '@/components/Common/Provider';
import './globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'highjoon-dev',
  description: "highjoon's dev-log",
  metadataBase: new URL('https://highjoon-dev.vercel.app'),
  keywords: ['highjoon', 'highjoon-dev', '윤상준'],
  openGraph: {
    title: 'highjoon-dev',
    description: "highjoon's dev-log",
    images: `https://highjoon-dev.vercel.app/images/img-profile.png`,
    url: 'https://highjoon-dev.vercel.app/',
    locale: 'ko',
    type: 'website',
    siteName: 'highjoon-dev',
  },
  applicationName: 'highjoon-dev',
  authors: [{ name: 'highjoon' }],
  creator: 'highjoon',
  publisher: 'highjoon',
  icons: {
    icon: '/favicon/apple-icon.png',
    shortcut: '/favicon/apple-icon.png',
    apple: '/favicon/apple-icon.png',
    other: {
      rel: '/favicon/apple-icon-precomposed',
      url: '/favicon/apple-icon-precomposed.png',
    },
  },
  verification: {
    google: 'LbwOezrQXMgFnEcGilDJsYIojUzx99UyZvDbGAIVX0Y',
    other: { 'naver-site-verification': '44f53dec93fca8bf3a5dc2af731720fe14e9fffe' },
  },
  alternates: { canonical: '/' },
  twitter: {
    title: 'highjoon-dev',
    description: "highjoon's dev-log",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={classnames(pretendard.className)} suppressHydrationWarning>
        <Provider>
          <Header />
          <div className={styles.root}>
            <main className={styles.main}>
              <div className={styles.container}>{children}</div>
              <Footer />
            </main>
          </div>
        </Provider>
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
