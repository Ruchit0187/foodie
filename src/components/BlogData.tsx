"use client";
import Image from "next/image";
import { blogData } from "../types";
import Link from "next/link";
import BlogLike from "./BlogLike";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";

function BlogData({ blogData }: { blogData: blogData[] }) {
  const [previousBlogData, setPreviousBlogData] =
    useState<blogData[]>(blogData);
  const [bottomValue, setBottomValue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const [newBlogData, setNewBlogData] = useState<blogData[]>(blogData);
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;
    if (bottom) {
      setBottomValue(bottom);
      setLimit((prev) => prev + 1);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    if (limit === 1) return;
    if (newBlogData.length === 0) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(`/api/blogs?limit=${limit}`);
      const blogJsonData = await data.json();
      setPreviousBlogData((prev) => [...prev, ...blogJsonData]);
      setNewBlogData(blogJsonData);
      setLoading(false);
    };
    fetchData();
  }, [limit]);
  return (
    <div className="w-full mx-auto p-4 ">
      <ul className="w-[95%] mx-auto grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
        {previousBlogData?.map((blogvalue) => (
          <li
            className="w-full flex flex-col items-center bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-amber-50"
            key={String(blogvalue._id)}
          >
            <Link href={`/blogs/${blogvalue._id}`}>
              <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible">
                <Image
                  src={blogvalue.image.trimEnd()}
                  width={250}
                  height={250}
                  className="object-cover object-center  h-65  rounded-2xl"
                  alt={blogvalue.name}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-1.5">
                  <span className="">
                    <BlogLike
                      bloglikes={blogvalue.blog_likes}
                      blogID={blogvalue._id}
                    />
                  </span>
                  <span className="">{blogvalue.date}</span>
                </div>
                <div className=" p-1.5 text-left italic font-bold ">
                  {blogvalue.title}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {loading ? <Loading /> : null}
    </div>
  );
}

export default BlogData;
