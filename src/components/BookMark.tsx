import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";


function BookMark({
  recipeID,
  bookmarkValue,
  blogID,
}: {
  recipeID?: string;
  blogID?: string;
  bookmarkValue: string[];
}) {
  const { data: sessionData } = useSession();
  const [bookmarkApi, setBookmarkApi] = useState<boolean>(false);
  useEffect(() => {
    if (sessionData?.user?.id) {
      const bookMark: boolean = bookmarkValue.includes(
        String(sessionData?.user?.id),
      );
      setBookmarkApi(bookMark);
    }
  }, [sessionData]);
  const handleMarkDown = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const markDownValue = await axios.patch("/api/bookmark", {
        userID: sessionData?.user?.id,
        recipeID,
        blogID
      });
      const bookValue: boolean =
        markDownValue.data.bookmarkValue.bookmark.includes(
          sessionData?.user?.id,
        );
      setBookmarkApi(bookValue);
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
