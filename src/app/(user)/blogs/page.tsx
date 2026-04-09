import BlogData from "@/src/components/BlogData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Foodie Blogs | Culinary Insights & Healthy Living",
  description: "Explore our collection of food blogs, featuring healthy recipes, culinary tips, and cooking guides from our passionate foodie community.",
  keywords: [
    "food blog",
    "healthy recipes",
    "culinary tips",
    "cooking guides",
    "foodie community",
    "easy meal ideas",
    "nutrition advice"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
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
  return <BlogData blogData={blogValue} />;
}

export default Blog;
