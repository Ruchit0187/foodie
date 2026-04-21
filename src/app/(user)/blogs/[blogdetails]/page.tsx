import { auth } from "@/auth";
import DeleteData from "@/src/components/DeleteData";
import BackButton from "@/src/components/BackButton";
import UpdateBlog from "@/src/components/UpdateBlog";
import { blogData } from "@/src/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../loading";
import type { Metadata } from "next";
import Script from "next/script";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

interface blogProps {
  params: Promise<{ blogdetails: string }>;
}

export async function generateMetadata(props: blogProps): Promise<Metadata> {
  const { blogdetails } = await props.params;
  try {
    const res = await fetch(`${BASE_URL}/api/blogs/${blogdetails}`);
    if (!res.ok) return { title: "Blog Not Found | Foodie" };
    const blog: blogData = await res.json();
    return {
      title: `${blog.name} – ${blog.category} Blog`,
      description:
        blog.quick_summary ||
        blog.description?.substring(0, 160) ||
        `Read about ${blog.name} on Foodie – your ultimate food companion.`,
      keywords: [
        blog.name,
        blog.category,
        blog.title,
        "food blog",
        "foodie",
        "healthy eating",
        "culinary tips",
        "nutrition",
      ],
      openGraph: {
        title: `${blog.name} – ${blog.category} | Foodie Blog`,
        description:
          blog.quick_summary || blog.description?.substring(0, 160) || "",
        type: "article",
        url: `${BASE_URL}/blogs/${blogdetails}`,
        images: [{ url: blog.image, alt: blog.name }],
        publishedTime: new Date(blog.date).toISOString(),
        siteName: "Foodie",
      },
      twitter: {
        card: "summary_large_image",
        title: `${blog.name} – ${blog.category} | Foodie Blog`,
        description:
          blog.quick_summary || blog.description?.substring(0, 160) || "",
        images: [blog.image],
      },
      alternates: {
        canonical: `${BASE_URL}/blogs/${blogdetails}`,
      },
    };
  } catch {
    return { title: "Blog | Foodie" };
  }
}

async function BlogDetails(props: blogProps) {
  const { blogdetails } = await  props.params;
  const session = await auth();
  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blogdetails}`
  );
  if (!blogData.ok) return notFound();
  const blogJsonData: blogData = await blogData.json();

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogJsonData.name,
    description: blogJsonData.quick_summary || blogJsonData.description?.substring(0, 160),
    image: blogJsonData.image,
    datePublished: new Date(blogJsonData.date).toISOString(),
    dateModified: new Date(blogJsonData.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "Foodie",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Foodie",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/foodielogo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blogs/${blogdetails}`,
    },
    articleSection: blogJsonData.category,
    keywords: [blogJsonData.name, blogJsonData.category, "food blog", "foodie"],
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
      {
        "@type": "ListItem",
        position: 3,
        name: blogJsonData.name,
        item: `${BASE_URL}/blogs/${blogdetails}`,
      },
    ],
  };

  // Dynamic FAQ schema from blog health_benefits
 
  return (
    <Suspense fallback={<Loading />}>
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
     
      <div className="flex flex-col bg-blue-100 mt-2.5 mx-3 rounded-3xl shadow-sm p-5">
        <BackButton />
        <div className="flex max-[950px]:flex-col max-[600px]:gap-2  justify-between gap-3.5 ">
          <div className="flex flex-col w-1/2 max-[950px]:w-full">
            <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible max-[950px]:w-full">
              <Image
                src={blogJsonData.image.trimEnd()}
                width={300}
                height={300}
                className="object-cover object-center rounded-lg h-95 w-full max-[950px]:w-full"
                alt={blogJsonData.name}
              />
            </div>
            <div className="flex flex-col p-2">
              <div className=" flex justify-between ">
                <h1 className="text-2xl font-extrabold ">
                  {blogJsonData.name}
                </h1>
                <span>{new Date(blogJsonData.date).toLocaleDateString("en-GB")}</span>
              </div>
              <span>{blogJsonData.category}</span>
              <div className=" flex justify-between">
                <p className="text-xl font-light mt-2">{blogJsonData.title}</p>
                {session?.user?.isAdmin ? (
                  <div className="flex  gap-2 ">
                    <UpdateBlog value={blogJsonData} />
                    <DeleteData blogID={blogdetails} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-1/2 mt-3.5 p-5 max-[950px]:w-full flex flex-col justify-between ">
            <div>
              <span className="text-2xl block font-bold underline">
                Description
              </span>
              <span className="leading-3 mt-2.5 pt-3">
                {blogJsonData.description}
              </span>
            </div>
            <div>
              <span className="text-2xl block font-bold underline">
                Quick Summary
              </span>
              <span className="leading-3 mt-2.5 pt-3">
                {blogJsonData.quick_summary}
              </span>
            </div>

            <div className="rounded-2xl">
              <ul>
                <span className="text-2xl font-bold underline">BeneFits:</span>
                {blogJsonData.health_benefits.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default BlogDetails;
