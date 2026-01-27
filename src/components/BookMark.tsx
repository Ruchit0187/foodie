import axios from "axios";
import { Session } from "next-auth";
import { MouseEvent, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";


function BookMark({
  recipeID,
  bookmarkValue,
  blogID,
  session:sessionData
}: {
  recipeID?: string;
  blogID?: string;
  bookmarkValue: string[];
  session:Session | null
}) {
  const [bookmarkApi, setBookmarkApi] = useState<boolean>(false);
  useEffect(() => {
    if (sessionData?.user?.id) {
      const bookMark: boolean = bookmarkValue.includes(
        String(sessionData?.user?.id),
      );
      setBookmarkApi(bookMark);
    }
  }, [bookmarkValue, sessionData?.user?.id]);
  const handleMarkDown = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setBookmarkApi((prev)=>!prev)
    try {
      const markDownValue = await axios.patch("/api/bookmark", {
        userID: sessionData?.user?.id,
        recipeID,
        blogID
      });
      if(markDownValue.status===200){
        return 
      }
      const bookValue: boolean =
        markDownValue.data.bookmarkValue.bookmark.includes(
          sessionData?.user?.id,
        );
      setBookmarkApi(bookValue);
    } catch (error) {
      toast.error(`${recipeID?"recipe":"blog"} not save`)
      setBookmarkApi((prev)=>!prev)
      console.log(error);
    }
  };
  return (
    <div className="mt-4 mb-2 text-sm text-body">
      {sessionData?.user && (
        <div className="flex">
          <button
            className="inline-flex items-center align-middle 
                      text-2xl text-blue-500
                      transition-transform duration-200
                      hover:scale-110 active:scale-95 cursor-pointer"
            onClick={(event) => handleMarkDown(event)}
          >
            {bookmarkApi ? <FaBookmark /> : <CiBookmark />}
          </button>
        </div>
      )}
    </div>
  );
}

export default BookMark;
