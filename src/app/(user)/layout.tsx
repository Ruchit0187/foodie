import Navbar from "@/src/components/Navbar";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
// import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next";
import Script from "next/script";
import LazyGTM from "@/src/components/LazyGTM";
import dynamic from "next/dynamic";
import OptimizedAnalytics from "@/src/components/OptimizedAnalytics";

export const metadata: Metadata = {
  verification: {
    google: "-7cFxBAdCIEchqn2aKZKT8_-tU0ujtRcK_QTaviHnN4",
  },
};

const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer)
);
const CookieBanner = dynamic(() => import("@/src/components/CookieBanner"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <GoogleAnalytics gaId="G-XQ5SK1MQCP" /> */}

      <body className="antialiased">
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
        <SessionProvider>
          <Navbar />
          <ToastContainer autoClose={2000} />
          {children}
        </SessionProvider>
        <CookieBanner />
        <OptimizedAnalytics />
        <LazyGTM gtmId="GTM-MTT2R75T" />
      </body>
    </html>
  );
}
