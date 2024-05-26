import Script from 'next/script';
import React from 'react';

const GoogleAdsense = () => {
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
};

export default GoogleAdsense;
