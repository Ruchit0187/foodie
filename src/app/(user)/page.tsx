import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

// layout.js or page.js
export const metadata: Metadata = {
  title: {
    default: "BiteRight | Discover Local Flavors",
    template: "%s | BiteRight",
  },
  description:
    "Explore the best local eateries, hidden gems, and culinary delights in your city.",
  keywords: [
    "food reviews",
    "restaurants near me",
    "recipes",
    "foodie community",
    "dining guide",
  ],
  openGraph: {
    title: "BiteRight | Your Ultimate Food Guide",
    description:
      "Join our community of food lovers and discover your next favorite meal.",
    locale: "en_US",
    type: "website",
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
