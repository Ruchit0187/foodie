import type { Metadata } from "next";
import QueryProvider from "@/src/components/QueryProvider";

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

  const recipesListingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of recipes can I find on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Foodie offers hundreds of recipes across vegetarian, vegan, and non-veg categories. Each recipe includes ingredients with quantities, cooking time, difficulty level (easy, medium, hard), and step-by-step instructions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I search and filter recipes on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can search recipes by name, filter by category (vegetarian, vegan, non-veg), and filter by difficulty level (easy, medium, hard). Our recipes page makes it easy to find exactly what you're looking for.",
        },
      },
      {
        "@type": "Question",
        name: "Are Foodie recipes suitable for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! Foodie has recipes for every skill level. Filter by 'easy' difficulty to find beginner-friendly recipes with simple ingredients and short cooking times. Each recipe clearly shows the cooking time and number of ingredients.",
        },
      },
    ],
  };

  return (
    <QueryProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recipesListingFaqSchema),
        }}
      />
      {children}
    </QueryProvider>
  );
}
