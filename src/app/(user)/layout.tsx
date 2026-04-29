import Navbar from "@/src/components/Navbar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
// import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from "@next/third-parties/google";
import CookieBanner from "@/src/components/CookieBanner";
import type { Metadata } from "next";
import Script from "next/script";


export const metadata: Metadata = {
  verification: {
    google: "-7cFxBAdCIEchqn2aKZKT8_-tU0ujtRcK_QTaviHnN4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <GoogleAnalytics gaId="G-XQ5SK1MQCP" /> */}
      <Script id="google-consent-mode" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Check for existing consent in localStorage
            let savedConsent = 'denied';
            try {
              savedConsent = localStorage.getItem('google_consent_status') || 'denied';
            } catch (e) {}

            gtag('consent', 'default', {
              'ad_storage': savedConsent,
              'ad_user_data': savedConsent,
              'ad_personalization': savedConsent,
              'analytics_storage': savedConsent,
              'wait_for_update': 500
            });
          `}
      </Script>
      <body className="antialiased">
        <SessionProvider>
          <CookieBanner />
          <Navbar />
          <ToastContainer autoClose={2000} />
          {children}
        </SessionProvider>
      </body>
      <GoogleTagManager gtmId="GTM-MTT2R75T"  />
    </html>
  );
}
