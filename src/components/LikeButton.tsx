import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import LikePopUp from "./LikePopUp";

interface likeButtonProps {
  recipeID?: string;
  likes: string[];
  blogID?: string;
}

function LikeButton({ recipeID, likes, blogID }: likeButtonProps) {
  const { data: sessionData } = useSession();
  const [likecontrol, setLikeControl] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes.length);

  useEffect(() => {
    if (sessionData?.user?.id) {
      const likeRecipeValue: boolean = likes?.includes(
        String(sessionData?.user?.id),
      );
      setLikeControl(likeRecipeValue);
    }
  }, [sessionData]);
  const handleLikeButton = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const likeValue = await axios.patch("/api/recipelike", {
        userID: sessionData?.user?.id,
        recipeID,
        blogID,
      });
      if (likeValue.status === 200) {
        const bookValue: boolean = likeValue.data.likes.includes(
          sessionData?.user?.id,
        );
        setLikeControl(bookValue);
        setLikeCount((prev) => (bookValue ? prev + 1 : prev - 1));
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
          <p className="inline-flex items-center ml-2 font-medium text-gray-700 align-middle">
            {likeCount}
          </p>
        </div>
      ) : (
        <LikePopUp />
      )}
    </div>
  );
}

export default LikeButton;
