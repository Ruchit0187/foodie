import Script from "next/script";
import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

export const metadata: Metadata = {
  title: "Recipes – Easy, Healthy & Delicious Meal Ideas",
  description:
    "Browse hundreds of easy-to-follow recipes on Foodie. Filter by category (vegetarian, vegan, non-veg) and difficulty level. Find your next favorite meal today!",
  keywords: [
    "recipes",
    "easy recipes",
    "healthy recipes",
    "vegetarian recipes",
    "vegan recipes",
    "non-veg recipes",
    "quick meals",
    "dinner ideas",
    "cooking recipes",
    "foodie recipes",
    "step by step recipes",
    "homemade food",
    "meal prep",
    "best recipes online",
  ],
  openGraph: {
    title: "Recipes – Easy, Healthy & Delicious Meal Ideas | Foodie",
    description:
      "Browse hundreds of easy-to-follow recipes. Filter by category and difficulty. Find your next favorite meal!",
    type: "website",
    images: [{ url: "/homepage.jpg", alt: "Foodie Recipes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipes – Easy, Healthy & Delicious Meal Ideas | Foodie",
    description:
      "Browse hundreds of easy-to-follow recipes. Filter by category and difficulty.",
    images: ["/homepage.jpg"],
  },
  alternates: {
    canonical: `${BASE_URL}/recipes`,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Foodie Recipes",
    url: `${BASE_URL}/recipes`,
    description:
      "Browse hundreds of easy-to-follow recipes on Foodie. Filter by category and difficulty level.",
    isPartOf: {
      "@type": "WebSite",
      name: "Foodie",
      url: BASE_URL,
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Recipes",
        item: `${BASE_URL}/recipes`,
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        strategy="beforeInteractive"
        id="recipe-collectionPageSchema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        id="recipe-breadcrumbSchema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
