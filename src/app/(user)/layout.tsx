import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Foodie",
    url: BASE_URL,
    logo: `${BASE_URL}/foodielogo.png`,
    description:
      "Foodie is your ultimate food companion. Explore thousands of easy recipes, healthy meal ideas, cooking tips, food blogs, and restaurant reviews.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Home",
        url: BASE_URL,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Recipes",
        url: `${BASE_URL}/recipes`,
        description:
          "Browse hundreds of easy-to-follow vegetarian, vegan, and non-veg recipes.",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Blogs",
        url: `${BASE_URL}/blogs`,
        description:
          "Read food blogs, cooking tips, healthy eating guides, and nutrition advice.",
      },
      {
        "@type": "SiteNavigationElement",
        name: "About Us",
        url: `${BASE_URL}/aboutus`,
        description:
          "Learn about Foodie — our mission to deliver happiness, one bite at a time.",
      },
    ],
  };

  const globalFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Foodie is a free online food platform where you can discover easy-to-follow recipes, read food blogs, get cooking tips, and find healthy meal ideas. We offer vegetarian, vegan, and non-veg recipes for every skill level.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find recipes on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Visit the Recipes page at foodie-nine-gold.vercel.app/recipes. You can filter recipes by category (vegetarian, vegan, non-veg), difficulty level (easy, medium, hard), and search by name. Each recipe includes ingredients, cooking time, and step-by-step instructions.",
        },
      },
      {
        "@type": "Question",
        name: "Does Foodie have food blogs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Foodie has a dedicated blog section with articles on healthy eating, cooking tips, nutrition advice, food trends, and culinary inspiration. Visit foodie-nine-gold.vercel.app/blogs to explore all our food blogs.",
        },
      },
      {
        "@type": "Question",
        name: "Is Foodie free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Foodie is completely free to use. You can browse all recipes and blogs without an account. Creating a free account lets you save bookmarks, like recipes, and personalize your experience.",
        },
      },
      {
        "@type": "Question",
        name: "What types of recipes are available on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Foodie offers a wide variety of recipes including vegetarian, vegan, and non-veg options. Each recipe has a difficulty rating (easy, medium, hard), cooking time, list of ingredients with quantities, and is categorized for easy browsing.",
        },
      },
      {
        "@type": "Question",
        name: "Can I save my favorite recipes on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, after creating a free Foodie account, you can bookmark your favorite recipes and blogs for quick access later. You can also like recipes to help others discover the best content.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <Script
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
        <Script
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalFaqSchema),
          }}
        />
        <GoogleAnalytics gaId="G-XQ5SK1MQCP" />
      </head>
      <body className="antialiased">
        <SessionProvider>
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
