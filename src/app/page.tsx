import Image from "next/image";
import Link from "next/link";

function HomePage() {
  return (
    <>
      <div className="w-full h-fit absolute">
        <Image
          src={
            "https://res.cloudinary.com/dbl3arvr1/image/upload/v1767867939/photo-1767647984458-0a75f8d92b5e_wbxazr.jpg"
          }
          alt="HomePage"
          height={1000}
          width={1000}
          className="w-full h-[87vh] object-cover"
        />
      </div>
      <div className="relative  translate-x-2/3relative inline-block  left-1/3  text-center translate-x-1/2 translate-y-full p-10 bg-white rounded-2xl mt-20 ">
        <p>
          <Link href={"/recipes"} className="text-2xl">
            Go to Recipe
          </Link>
        </p>
        <p>
          <Link href={"/blogs"} className="text-2xl">
            Go to Blogs
          </Link>
        </p>
      </div>
    </>
  );
}

export default HomePage;
