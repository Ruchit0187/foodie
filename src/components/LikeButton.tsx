import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import LikePopUp from "./LikePopUp";
import { toast } from "react-toastify";
import { Session } from "next-auth";

interface likeButtonProps {
  recipeID?: string;
  likes: string[];
  session: Session | null;
  blogID?: string;
}

function LikeButton({
  recipeID,
  likes,
  session: sessionData,
  blogID,
}: likeButtonProps) {
  const [likecontrol, setLikeControl] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  useEffect(() => {
    if (sessionData?.user?.id) {
      const likeRecipeValue: boolean = likes?.includes(
        sessionData?.user?.id?.toString(),
      );
      setLikeControl(likeRecipeValue);
    }
  }, [likes, sessionData?.user?.id]);
  const handleLikeButton = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setLikeControl((prev) => !prev);
    setLikeCount((prev) => (likecontrol ? prev - 1 : prev + 1));
    try {
      const likeValue = await axios.patch("/api/recipelike", {
        userID: sessionData?.user?.id,
        recipeID,
        blogID,
      });
      if (likeValue.status === 200) {
        return;
      }
    } catch (error) {
      toast.error("Like not Work");
      setLikeControl((prev) => !prev);
      setLikeCount((prev) => (!likecontrol ? prev - 1 : prev + 1));
      console.log(error);
    }
  };
  return (
    <div className="mt-4 mb-2 text-sm text-body">
      {true ? (
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
