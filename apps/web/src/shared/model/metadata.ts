import { Metadata } from 'next';

export const generateRootMetadata = (): Metadata => {
  return {
    title: 'highjoon-dev',
    description: "highjoon's dev-log",
    metadataBase: new URL('https://highjoon-dev.com'),
    keywords: ['highjoon', 'highjoon-dev', '윤상준'],
    openGraph: {
      title: 'highjoon-dev',
      description: "highjoon's dev-log",
      images: `https://highjoon-dev.com/images/img-profile.png`,
      url: 'https://highjoon-dev.com/',
      locale: 'ko',
      type: 'website',
      siteName: 'highjoon-dev',
    },
    applicationName: 'highjoon-dev',
    authors: [{ name: 'highjoon' }],
    creator: 'highjoon',
    publisher: 'highjoon',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
    },
    other: {
      'mobile-web-app-capable': 'yes',
    },
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
      google: 'NWn1gMv04lL-zANuiZxvlIY1qOXz3hOSKppwh5qEeqw',
      other: { 'naver-site-verification': '44f53dec93fca8bf3a5dc2af731720fe14e9fffe' },
    },
    alternates: { canonical: '/' },
    twitter: {
      title: 'highjoon-dev',
      description: "highjoon's dev-log",
    },
  };
};
