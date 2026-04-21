import BlogData from "@/src/components/BlogData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

export const dynamic = "force-dynamic";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

export const metadata: Metadata = {
  title: "Foodie Blogs | Culinary Insights & Healthy Living",
  description:
    "Explore our collection of food blogs, featuring healthy recipes, culinary tips, and cooking guides from our passionate foodie community.",
  keywords: [
    "food blog",
    "healthy recipes",
    "culinary tips",
    "cooking guides",
    "foodie community",
    "easy meal ideas",
    "nutrition advice",
    "foodie blog",
    "healthy eating tips",
    "food articles",
    "cooking blog",
    "meal planning",
    "diet tips",
    "food lifestyle",
  ],
  openGraph: {
    title: "Foodie Blogs | Culinary Insights & Healthy Living",
    description:
      "Explore our collection of food blogs, featuring healthy recipes, culinary tips, and cooking guides.",
    type: "website",
    images: [{ url: "/blog-background.jpg", alt: "Foodie Blogs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foodie Blogs | Culinary Insights & Healthy Living",
    description:
      "Explore food blogs, healthy recipes, culinary tips, and cooking guides.",
    images: ["/blog-background.jpg"],
  },
  alternates: {
    canonical: `${BASE_URL}/blogs`,
  },
};

export const blogDataFetch = async (limit: number) => {
  try {
    const blogResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?limit=${limit}`,
      { cache: "no-store" },
    );
    if (!blogResponse.ok) return notFound();
    const blogDataValue = await blogResponse.json();
    return blogDataValue;
  } catch (error) {
    console.log(error);
  }
};

async function Blog() {
  const blogValue = await blogDataFetch(1);

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Foodie Blogs",
    url: `${BASE_URL}/blogs`,
    description:
      "Explore our collection of food blogs, featuring healthy recipes, culinary tips, and cooking guides from our passionate foodie community.",
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
        name: "Blogs",
        item: `${BASE_URL}/blogs`,
      },
    ],
  };

  const blogFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What kind of food blogs does Foodie have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Foodie features a diverse range of food blogs covering healthy eating tips, nutrition advice, cooking guides, food trends, restaurant reviews, and culinary inspiration. Each blog includes health benefits, quick summaries, and detailed descriptions.",
        },
      },
      {
        "@type": "Question",
        name: "How often are new blogs published on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "New food blogs are published regularly on Foodie. Our team of food enthusiasts constantly adds fresh content about healthy recipes, cooking tips, nutrition facts, and food trends to keep our community inspired.",
        },
      },
      {
        "@type": "Question",
        name: "Can I bookmark my favorite food blogs on Foodie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! After creating a free Foodie account, you can bookmark any blog post to save it for later reading. You can also like blogs to help others discover the best food content.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogFaqSchema),
        }}
      />
      <BlogData blogData={blogValue} />
    </>
  );
}

export default Blog;
