import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

// layout.js or page.js
export const metadata: Metadata = {
  title: {
    default: "Foodie | Discover Recipes, Blogs & Local Flavors",
    template: "%s | Foodie",
  },
  description:
    "Foodie is your go-to platform for discovering easy recipes, healthy meal ideas, food blogs, cooking tips, and restaurant reviews. Explore local flavors and join our foodie community!",
  keywords: [
    "foodie",
    "recipes",
    "easy recipes",
    "healthy dinner ideas",
    "food reviews",
    "restaurants near me",
    "quick meals",
    "step by step cooking",
    "foodie community",
    "food blog",
    "cooking tips",
    "vegetarian recipes",
    "vegan food",
    "non-veg recipes",
    "Indian food recipes",
    "homemade meals",
    "meal prep ideas",
    "best food app",
    "discover local flavors",
  ],
  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    title: "Foodie | Your Ultimate Food Guide",
    description:
      "Join our community of food lovers and discover your next favorite meal. Explore recipes, blogs, and local food gems.",
    url: BASE_URL,
    siteName: "Foodie",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Foodie – Discover Recipes & Local Flavors",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Foodie | Your Ultimate Food Guide",
    description:
      "Discover easy recipes, healthy meal ideas, food blogs, and local flavors with Foodie.",
    images: ["/homepage.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Foodie",
    url: BASE_URL,
    description:
      "Foodie is your go-to platform for discovering easy recipes, healthy meal ideas, food blogs, cooking tips, and restaurant reviews.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/recipes?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="relative w-full h-[87vh]">
        <Image
          src="/homepage.jpg"
          alt="Foodie – Discover Recipes, Food Blogs & Local Flavors"
          fill
          className="object-cover"
          quality={75}
          priority
        />
        <div className="absolute inset-0 bg-black/40 max-[500px]:top-28" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 text-center space-y-4 w-full max-w-sm">
            <p>
              <Link
                href="/recipes"
                className="text-xl sm:text-2xl font-semibold hover:text-orange-600 transition"
              >
                Go to Recipes
              </Link>
            </p>
            <p>
              <Link
                href="/blogs"
                className="text-xl sm:text-2xl font-semibold hover:text-orange-600 transition"
              >
                Go to Blogs
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
