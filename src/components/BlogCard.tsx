import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import type{ blogData } from "../types";
import SkeletonEffect from "./Skeleton";
const LikeButton = dynamic(() => import("./LikeButton"), { ssr: false });
const BookMark = dynamic(() => import("./BookMark"), { ssr: false });
export const BlogCard = ({
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
            priority={index < 6}
            fetchPriority={index < 6 ? "high" : "low"}
            onLoad={() => setIsLoaded(true)}
            quality={85}
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