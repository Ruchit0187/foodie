import BlogData from "@/src/components/BlogData";
import { notFound } from "next/navigation";

const blogDataFetch = async () => {
  try {
    const blogResponse = await fetch("http://localhost:3000/api/blogs", {
      next: { revalidate: 10 },
    });
    if (!blogResponse.ok) return notFound();
    const blogDataValue = await blogResponse.json();
    return blogDataValue;
  } catch (error) {
    console.log(error);
  }
};

async function Blog() {
  const blogValue = await blogDataFetch();
  return <BlogData blogData={blogValue} />;
}

export default Blog;
