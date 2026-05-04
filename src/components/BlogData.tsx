"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { blogData } from "../types";
import { useInView } from "react-intersection-observer";
import { useDebounceCallback } from "usehooks-ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { BlogCard } from "./BlogCard";
const Datanot = dynamic(() => import("./Datanot"), { ssr: false });

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

  // Updated rootMargin to 100px from the second component
  const { ref, inView } = useInView({ rootMargin: "100px" });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["products-feed", search],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `/api/blogs?limit=${pageParam}&search=${search}`,
        );
        const json = await res.json();
        // Return matching the logic of the second component's structure
        return { blogData: json.blogData ?? [], total: json.count ?? 0 };
      },
      getNextPageParam: (lastPage, allPages) => {
        // Calculation logic from the second component
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
      staleTime: 1000 * 60 * 5,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.blogData ?? []) ?? [];

  return (
    <div className="w-full mx-auto p-4 flex flex-col gap-6">
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
              key={blogvalue._id.toString()}
              blogvalue={blogvalue}
              index={index}
              sessionData={session}
            />
          ))}
        </ul>
      )}
      {hasNextPage && (
        <div ref={ref} className="py-12 flex justify-center items-center h-32">
          {isFetchingNextPage ? (
            <Loading />
          ) : (
            <Link
              href={`/blogs?page=${data.pages.length + 1}`}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              prefetch={false}
            >
              Next Page
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogData;
