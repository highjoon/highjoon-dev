import React from 'react';
import Script from 'next/script';

export default function GoogleAdsense() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8831357252494091"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
