import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

// layout.js or page.js
export const metadata: Metadata = {
  title: {
    default: "Foodie | Discover Local Flavors",
    template: "%s | Foodie",
  },
  description:
    "Explore the best local eateries, hidden gems, and culinary delights in your city.",
  keywords: [
    "recipes",
    "easy recipes",
    "healthy dinner ideas",
    "food reviews",
    "restaurants near me",
    "quick meals",
    "step by step cooking",
    "foodie community",
  ],
   alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
  
  openGraph: {
    title: "Foodie | Your Ultimate Food Guide",
    description:
      "Join our community of food lovers and discover your next favorite meal.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/homepage.jpg",
        width: 800,
        height: 600,
        alt: "Foodie Logo",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

function HomePage() {
  return (
    <div className="relative w-full h-[87vh]">
      <Image
        src="/homepage.jpg"
        alt="HomePage"
        fill
        className="object-cover"
        quality={75}
      />
      <div className="absolute inset-0 bg-black/40 max-[500px]:top-28" />
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 text-center space-y-4 w-full max-w-sm">
          <p>
            <Link
              href="/recipes"
              className="text-xl sm:text-2xl font-semibold hover:text-orange-600 transition"
            >
              Go to Recipes
            </Link>
          </p>
          <p>
            <Link
              href="/blogs"
              className="text-xl sm:text-2xl font-semibold hover:text-orange-600 transition"
            >
              Go to Blogs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
