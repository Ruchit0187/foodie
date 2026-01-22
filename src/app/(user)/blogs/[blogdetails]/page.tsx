import { auth } from "@/auth";
import DeleteData from "@/src/components/DeleteData";
import BackButton from "@/src/components/BackButton";
import UpdateBlog from "@/src/components/UpdateBlog";
import { blogData } from "@/src/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../loading";

interface blogProps {
  params: Promise<{ blogdetails: string }>;
}

async function BlogDetails(props: blogProps) {
  const { blogdetails } = await props.params;
  const session = await auth();
  const blogData = await fetch(
    `${process.env.BASE_URL}/api/blogs/${blogdetails}`
  );
  if (!blogData.ok) return notFound();
  const blogJsonData: blogData = await blogData.json();
  return (
    <Suspense fallback={<Loading />}>
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
                <span className="text-2xl font-extrabold ">
                  {blogJsonData.name}
                </span>
                <span>{new Date(blogJsonData.date).toLocaleDateString("en-GB")}</span>
              </div>
              <span>{blogJsonData.category}</span>
              <div className=" flex justify-between">
                <p className="text-xl font-light mt-2">{blogJsonData.title}</p>
                {session?.user?.isAdmin === "true" ? (
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
