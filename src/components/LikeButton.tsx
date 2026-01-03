import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";

interface likeButtonProps {
  recipeId: string;
  count: number;
}

function LikeButton({ recipeId, count }: likeButtonProps) {
  const { data: sessionData } = useSession();
  const [likeRecipe, setLikeRecipe] = useState<number>(count);
  const handleLikeButton = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    value: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const likeValue = await axios.post("/api/recipelike", {
        userID: sessionData?.user?.id,
        recipeID: value,
      });
      console.log(likeValue)
      if (likeValue.status === 200){
        setLikeRecipe(likeValue.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-body text-sm flex justify-between mt-4 mb-2">
      {sessionData?.user && (
        <>
          <button
            className="cursor-pointer text-2xl text-red-800"
            onClick={(event) => handleLikeButton(event, recipeId)}
          >
            <FcLikePlaceholder />
          </button>
          <p>{likeRecipe}</p>
        </>
      )}
    </div>
  );
}

export default LikeButton;
