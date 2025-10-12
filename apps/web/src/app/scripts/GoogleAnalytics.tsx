import React from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XW8LXFXK6N`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XW8LXFXK6N');
    `}
      </Script>
    </>
  );
}
