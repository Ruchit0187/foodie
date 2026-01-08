"use client"
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton() {
const router=useRouter()
  return (
    <button onClick={()=>router.back()} className="mx-5 text-2xl cursor-pointer">
        <IoMdArrowRoundBack/>
    </button>
  )
}

export default BackButton