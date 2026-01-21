"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import LikePopUp from "./LikePopUp";

interface blogLikeProps {
  bloglikes: string[];
  blogID: string;
}
function BlogLike({ bloglikes, blogID }: blogLikeProps) {
  const { data: sessionData } = useSession();
  const [likecontrol, setLikeControl] = useState(false);
  const [bloglikeCount,setBlogLikeCount]=useState<number>(bloglikes.length);

  useEffect(() => {
    if (sessionData?.user?.id) {
      const liked = bloglikes.includes(String(sessionData.user.id));
      setLikeControl(liked);
    }
  }, [sessionData]);
  const handleLikeButton = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const blogLikeValue = await axios.patch("/api/bloglike", {
        userID: sessionData?.user?.id,
        blogID,
      });
      if (blogLikeValue.status === 200) {
        const bookValue: boolean = blogLikeValue?.data?.blog_likes.includes(
          sessionData?.user?.id
        );
        setLikeControl(bookValue);
        setBlogLikeCount((prev)=>bookValue?prev+1:prev-1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4 mb-2 text-sm text-body">
      {sessionData?.user ? (
        <div className="flex">
          <button
            className="inline-flex items-center align-middle 
                     text-2xl text-red-600
                     transition-transform duration-200
                     hover:scale-110 active:scale-95 cursor-pointer"
            onClick={(event) => handleLikeButton(event)}
          >
            {likecontrol ? <FcLike /> : <FcLikePlaceholder />}
          </button>
          <span className="ml-2">{bloglikeCount}</span>
        </div>
      ) : (
        <LikePopUp />
      )}
    </div>
  );
}

export default BlogLike;
