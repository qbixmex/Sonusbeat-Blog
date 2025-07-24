'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

export const GoogleAnalyticsWrapper: React.FC = () => {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null

  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
};

export default GoogleAnalyticsWrapper;
