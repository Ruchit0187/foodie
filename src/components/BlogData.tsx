"use client";
import Image from "next/image";
import { blogData } from "../types";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { useDebounceCallback, useMediaQuery } from "usehooks-ts";
import SkeletonEffect from "./Skeleton";
import Datanot from "./Datanot";
import BookMark from "./BookMark";
import LikeButton from "./LikeButton";
import { useSession } from "next-auth/react";
import { useRef } from "react";

// Sub-component to handle individual blog item state and image loading
const BlogCard = ({
  blogvalue,
  index,
  sessionData,
}: {
  blogvalue: blogData;
  index: number;
  sessionData: any;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const matches = useMediaQuery("(max-width: 640px)");

  return (
    <li
      className="w-full flex flex-col items-center bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-amber-50"
      key={String(blogvalue._id)}
    >
      <Link href={`/blogs/${blogvalue._id}`} className="w-full">
        <div className="relative grid w-full place-items-center rounded-lg p-6 lg:overflow-visible min-h-[300px]">
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
              <SkeletonEffect />
            </div>
          )}
          <Image
            src={blogvalue.image.trimEnd()}
            className={`object-cover object-center rounded-2xl transition-opacity duration-500 ${
              isLoaded ? "opacity-100 h-65" : "opacity-0"
            }`}
            width={250}
            height={250}
            alt={blogvalue.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={
              matches
                ? index < 1
                  ? "eager"
                  : "lazy"
                : index < 3
                  ? "eager"
                  : "lazy"
            }
            fetchPriority={
              matches
                ? index < 1
                  ? "high"
                  : "low"
                : index < 3
                  ? "high"
                  : "low"
            }
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-1.5">
            <span>
              <LikeButton
                likes={blogvalue?.likes}
                blogID={blogvalue?._id}
                session={sessionData}
              />
            </span>
            <span className="text-sm text-gray-600">
              {new Date(blogvalue.date).toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="flex justify-between items-center px-2">
            <h1 className="p-1.5 text-left italic font-semibold text-xl line-clamp-1">
              {blogvalue.name}
            </h1>
            <span className="mb-2.5">
              <BookMark
                blogID={blogvalue._id}
                bookmarkValue={blogvalue.bookmark}
                session={sessionData}
              />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

function BlogData({ blogData }: { blogData: blogData[] }) {
  const [moreData, setMoreData] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [previousBlogData, setPreviousBlogData] =
    useState<blogData[]>(blogData);
  const [bottomValue, setBottomValue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const [hasEmptyBlogData, setHasEmptyBlogData] = useState<boolean>(false);
  const debounce = useDebounceCallback(setSearch, 1000);
  const { data: sessionData } = useSession();
  const isInitialMount = useRef(true);
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
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Skip the first fetch on mount because data is already provided by the server
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetch(`/api/blogs?limit=${limit}&search=${search}`);
        const blogJsonData = await data.json();
        if (blogJsonData.length === 0) {
          setHasEmptyBlogData(true);
        } else {
          setHasEmptyBlogData(false);
        }
        if (
          blogJsonData.length === previousBlogData.length &&
          blogJsonData.length !== 6
        ) {
          setMoreData(false);
        }
        setPreviousBlogData(blogJsonData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
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
          {previousBlogData?.map((blogvalue, index) => (
            <BlogCard
              key={String(blogvalue._id)}
              blogvalue={blogvalue}
              index={index}
              sessionData={sessionData}
            />
          ))}
        </ul>
      )}
      {loading ? <Loading /> : null}
    </div>
  );
}

export default BlogData;
