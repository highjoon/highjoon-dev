import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import GoogleAdsense from '@/app/scripts/GoogleAdsense';
import GoogleAnalytics from '@/app/scripts/GoogleAnalytics';
import WebsiteSchema from '@/app/seo/WebsiteSchema';

export default function AppScripts() {
  return (
    <>
      <GoogleAdsense />
      <WebsiteSchema />
      <GoogleAnalytics />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
