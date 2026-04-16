import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Foodie – Discover Recipes, Food Blogs & Culinary Inspiration",
    template: "%s | Foodie",
  },
  description:
    "Foodie is your ultimate food companion. Explore thousands of easy recipes, healthy meal ideas, cooking tips, food blogs, and restaurant reviews. Join our passionate foodie community today!",
  keywords: [
    "foodie",
    "recipes",
    "food blog",
    "healthy recipes",
    "easy recipes",
    "cooking tips",
    "meal ideas",
    "vegetarian recipes",
    "vegan recipes",
    "non-veg recipes",
    "quick meals",
    "dinner ideas",
    "step by step cooking",
    "food community",
    "restaurant reviews",
    "culinary inspiration",
    "healthy eating",
    "cooking guides",
    "best recipes online",
    "foodie app",
    "Indian recipes",
    "homemade food",
    "food delivery platform",
  ],
  authors: [{ name: "Foodie" }],
  creator: "Foodie",
  publisher: "Foodie",
  verification: {
    google: "-7cFxBAdCIEchqn2aKZKT8_-tU0ujtRcK_QTaviHnN4",
  },
  openGraph: {
    title: "Foodie – Discover Recipes, Food Blogs & Culinary Inspiration",
    description:
      "Explore thousands of easy recipes, healthy meal ideas, cooking tips, and food blogs. Join the Foodie community today!",
    url: BASE_URL,
    siteName: "Foodie",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Foodie – Your Ultimate Food Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foodie – Discover Recipes, Food Blogs & Culinary Inspiration",
    description:
      "Explore thousands of easy recipes, healthy meal ideas, cooking tips, and food blogs.",
    images: ["/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          <ToastContainer autoClose={2000} />
            <SpeedInsights />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
