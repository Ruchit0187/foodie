import "../globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/src/components/Navbar";
// import { GoogleAnalytics } from '@next/third-parties/google'
import LazyGTM from "@/src/components/LazyGTM";
const ToastContainer = dynamic(() =>
  import("react-toastify").then((toast) => toast.ToastContainer),
);
const CookieBanner = dynamic(() => import("@/src/components/CookieBanner"));
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
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          <ToastContainer autoClose={2000} />
          {children}
        </SessionProvider>
        <CookieBanner />
        <LazyGTM gtmId="GTM-MTT2R75T" />
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
      </body>
    </html>
  );
}
