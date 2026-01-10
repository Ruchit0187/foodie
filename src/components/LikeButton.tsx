import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface likeButtonProps {
  recipeId: string;
  count: number;
  likes: string[];
}

function LikeButton({ recipeId, count, likes }: likeButtonProps) {
  const { data: sessionData } = useSession();
  const [likecontrol, setLikeControl] = useState<boolean>(false);
  const [likeRecipe, setLikeRecipe] = useState<number>(count);
  useEffect(() => {
    if (sessionData?.user?.id) {
      const likeRecipeValue: boolean = likes?.includes(
        String(sessionData?.user?.id)
      );
      setLikeControl(likeRecipeValue);
    }
  }, [sessionData]);
  const handleLikeButton = async (event: MouseEvent, value: string) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const likeValue = await axios.patch("/api/recipelike", {
        userID: sessionData?.user?.id,
        recipeID: value,
      });
      if (likeValue.status === 200) {
        setLikeRecipe(likeValue.data.count);
        const bookValue: boolean = likeValue.data.likes.includes(
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
            onClick={(event) => handleLikeButton(event, recipeId)}
          >
            {likecontrol ? <FcLike /> : <FcLikePlaceholder />}
          </button>
          <p className="inline-flex items-center ml-2 font-medium text-gray-700 align-middle">
            {likeRecipe}
          </p>
        </div>
      )}
    </div>
  );
}

export default LikeButton;
