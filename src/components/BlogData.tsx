"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { blogData } from "../types";
import { useInView } from "react-intersection-observer";
import { useDebounceCallback } from "usehooks-ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import SkeletonEffect from "./Skeleton";
import Loading from "./Loading";
const Datanot = dynamic(() => import("./Datanot"), { ssr: false });
const LikeButton = dynamic(() => import("./LikeButton"), { ssr: false });
const BookMark = dynamic(() => import("./BookMark"), { ssr: false });
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

  return (
    <li
      className="w-full flex flex-col items-center bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-amber-50"
      key={String(blogvalue._id)}
    >
      <Link href={`/blogs/${blogvalue._id}`} className="w-full">
        <div className="relative grid w-full place-items-center rounded-lg p-6 lg:overflow-visible min-h-75">
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
            priority={index < 3}
            fetchPriority={index < 6 ? "high" : "low"}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="flex items-center justify-between p-1.5 h-15">
          <LikeButton
            likes={blogvalue?.likes}
            blogID={blogvalue?._id}
            session={sessionData}
          />
          <span className="text-sm text-gray-600">
            {new Date(blogvalue.date).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="flex justify-between items-center px-2">
          <h1 className="p-1.5 text-left italic font-semibold text-xl line-clamp-1">
            {blogvalue.name}
          </h1>
          <BookMark
            blogID={blogvalue._id}
            bookmarkValue={blogvalue.bookmark}
            session={sessionData}
          />
        </div>
      </Link>
    </li>
  );
};

function BlogData({
  blogData,
  count,
  session,
}: {
  blogData: blogData[];
  count: number;
  session: any;
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const debouncedSetSearch = useDebounceCallback(setSearch, 1000);
  const { ref, inView } = useInView({ rootMargin: "200px" });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["products-feed", search],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `/api/blogs?limit=${pageParam}&search=${search}`,
        );
        const json = await res.json();
        return { blogData: json.blogData ?? [], total: json.count ?? 0 };
      },
      getNextPageParam: (lastPage, allPages) => {
        const fetchedCount = allPages.flatMap((p) => p.blogData ?? []).length;
        const total = lastPage.total;
        if (total == null) return undefined;
        return fetchedCount < total ? allPages.length + 1 : undefined;
      },
      initialData: !search
        ? {
            pages: [
              {
                blogData: blogData.slice(0, 6), 
                total: count,
              },
            ],
            pageParams: [1],
          }
        : undefined,
      staleTime: 0,
      gcTime: 0,
    });

  // 3. THE AUTOMATIC TRIGGER
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const allProducts = data?.pages.flatMap((page) => page.blogData ?? []) ?? [];
  console.log("data", data);
  return (
    <div className="w-full mx-auto p-4 ">
      <div className="text-end mb-2">
        <input
          type="text"
          className="py-2 px-2 text-black border-2 rounded-2xl"
          placeholder="Search Blog Details"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            debouncedSetSearch(event.target.value);
          }}
        />
      </div>
      {allProducts.length === 0 && !isLoading ? (
        <Datanot />
      ) : (
        <ul className="w-[95%] mx-auto grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
          {allProducts.map((blogvalue, index) => (
            <BlogCard
              key={String(blogvalue._id)}
              blogvalue={blogvalue}
              index={index}
              sessionData={session}
            />
          ))}
        </ul>
      )}
      <div ref={ref} className="h-4" />
      {(isLoading || isFetchingNextPage) && <Loading />}
    </div>
  );
}

export default BlogData;
