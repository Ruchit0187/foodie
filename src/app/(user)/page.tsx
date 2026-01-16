import Image from "next/image";
import Link from "next/link";

function HomePage() {
  // if(!data) return "Loading..."
  return (
    <>
      <div className="w-full h-fit absolute">
        <Image
          src={"/homepage.jpg"}
          alt="HomePage"
          height={1000}
          width={1000}
          className="w-full h-[87vh] object-cover"
          quality={75}
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
