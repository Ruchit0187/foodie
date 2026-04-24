import Navbar from "@/src/components/Navbar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
// import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from "@next/third-parties/google";
import CookieBanner from "@/src/components/CookieBanner";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-consent-mode" strategy="beforeInteractive">
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
        <GoogleTagManager gtmId="GTM-MTT2R75T" />
        <meta
          name="google-site-verification"
          content="-7cFxBAdCIEchqn2aKZKT8_-tU0ujtRcK_QTaviHnN4"
        />
        {/* <GoogleAnalytics gaId="G-XQ5SK1MQCP" /> */}
      </head>
      <body className="antialiased">
        <SessionProvider>
          <CookieBanner />
          <Navbar />
          <ToastContainer autoClose={2000} />
          <SpeedInsights />
          <Analytics />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
