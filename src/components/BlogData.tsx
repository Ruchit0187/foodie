"use client";
import Image from "next/image";
import { blogData } from "../types";
import Link from "next/link";
import BlogLike from "./BlogLike";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { useDebounceCallback } from "usehooks-ts";
import SkeletonEffect from "./Skeleton";
import Datanot from "./Datanot";
import BookMark from "./BookMark";

function BlogData({ blogData }: { blogData: blogData[] }) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [moreData, setMoreData] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [previousBlogData, setPreviousBlogData] =
    useState<blogData[]>(blogData);
  const [bottomValue, setBottomValue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const [hasEmptyBlogData, setHasEmptyBlogData] = useState<boolean>(false);
  const debounce = useDebounceCallback(setSearch, 1000);
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;
    if (bottom && moreData) {
      setBottomValue(bottom);
      setLimit((prev) => prev + 1);
    }
  }, [moreData]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(`/api/blogs?limit=${limit}&search=${search}`);
      const blogJsonData = await data.json();
      if (blogJsonData.length === 0) {
        setHasEmptyBlogData(true);
      }
      if (blogJsonData.length > 0) {
        setHasEmptyBlogData(false);
      }
      if (
        blogJsonData.length === previousBlogData.length &&
        blogJsonData.length != 6
      ) {
        setMoreData(false);
      }
      setPreviousBlogData(blogJsonData);
      setLoading(false);
    };
    fetchData();
  }, [limit, search]);
  return (
    <div className="w-full mx-auto p-4 ">
      <div className="text-end mb-2">
        <input
          type="text"
          className="py-2 px-2 text-black border-2 rounded-2xl"
          placeholder="Search Blog Details"
          onChange={(event) => debounce(event.target.value)}
        />
      </div>
      {hasEmptyBlogData ? (
        <Datanot />
      ) : (
        <ul className="w-[95%] mx-auto grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
          {previousBlogData?.map((blogvalue) => (
            <li
              className="w-full flex flex-col items-center bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-amber-50"
              key={String(blogvalue._id)}
            >
              <Link href={`/blogs/${blogvalue._id}`}>
                <div className="relative grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible">
                  {imageLoading && <SkeletonEffect />}
                  <Image
                    src={blogvalue.image.trimEnd()}
                    className={`object-cover object-center  rounded-2xl  ${
                      imageLoading ? "opacity-0" : "opacity-100  h-65"
                    }`}
                    width={imageLoading ? 0 : 250}
                    height={imageLoading ? 0 : 250}
                    alt={blogvalue.name}
                    onLoad={() => setImageLoading(false)}
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
                    <span>{blogvalue.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className=" p-1.5 text-left italic font-semibold text-xl">
                      {blogvalue.name}
                    </span>
                    <span className="mb-2.5">
                      <BookMark
                        blogID={blogvalue._id}
                        bookmarkValue={blogvalue.bookmark}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {loading ? <Loading /> : null}
    </div>
  );
}

export default BlogData;
