'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from '../i18n/navigation';

export const GoogleAnalyticsWrapper: React.FC = () => {
  const pathname = usePathname();

  if (
    process.env.NEXT_PUBLIC_GA_ID
      || !pathname.startsWith('/login')
      || !pathname.startsWith('/admin')
  ) {
    return (
      <>
        {`<!-- Google Analytics -->`}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </>
    );
  }
  return null;
};

export default GoogleAnalyticsWrapper;
