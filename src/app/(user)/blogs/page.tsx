import BlogData from "@/src/components/BlogData";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export const blogDataFetch = async (limit: number) => {
  try {
    const blogResponse = await fetch(
      `${process.env.BASE_URL}/api/blogs?limit=${limit}`,
      { cache: "no-cache" }
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
  return (
    <Suspense fallback={<Loading />}>
      <BlogData blogData={blogValue} />;
    </Suspense>
  );
}

export default Blog;
