import BlogData from "@/src/components/BlogData";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
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
