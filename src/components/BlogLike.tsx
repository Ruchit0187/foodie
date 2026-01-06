import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface blogLikeProps {
  bloglikes: string[];
  blogID: string;
}
function BlogLike({ bloglikes, blogID }: blogLikeProps) {
  const { data: sessionData } = useSession();
  const likeRecipeValue: boolean = bloglikes?.includes(
    String(sessionData?.user?.id)
  );
  const [likecontrol, setLikeControl] = useState(likeRecipeValue);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4 mb-2 text-sm text-body">
      {sessionData?.user && (
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
        </div>
      )}
    </div>
  );
}

export default BlogLike;
