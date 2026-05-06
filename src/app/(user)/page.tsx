import Link from "next/link";
import Picture from "@/src/components/Picture";
function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Foodie",
    url: "https://foodie-nine-gold.vercel.app",
    description:
      "Foodie is your go-to platform for discovering easy recipes, healthy meal ideas, food blogs, cooking tips, and restaurant reviews.",
  };
  return (
    <>
      <head>
        <title>Foodie | Discover Recipes, Blogs & Local Flavors</title>
        <meta
          name="description"
          content="Foodie is your go-to platform for discovering easy recipes, healthy meal ideas, food blogs, cooking tips, and restaurant reviews. Explore local flavors and join our foodie community!"
        />
        <meta
          name="keywords"
          content="foodie, recipes, easy recipes, healthy dinner ideas, food reviews, restaurants near me, quick meals, step by step cooking, foodie community, food blog, cooking tips, vegetarian recipes, vegan food, non-veg recipes, Indian food recipes, homemade meals, meal prep ideas, best food app, discover local flavors"
        />
        <link rel="canonical" href="https://foodie-nine-gold.vercel.app" />
        <meta property="og:title" content="Foodie | Your Ultimate Food Guide" />
        <meta
          property="og:description"
          content="Join our community of food lovers and discover your next favorite meal. Explore recipes, blogs, and local food gems."
        />
        <meta property="og:url" content="https://foodie-nine-gold.vercel.app" />
        <meta property="og:site_name" content="Foodie" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://foodie-nine-gold.vercel.app/homepage.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Foodie – Discover Recipes & Local Flavors"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Foodie | Your Ultimate Food Guide"
        />
        <meta
          name="twitter:description"
          content="Discover easy recipes, healthy meal ideas, food blogs, and local flavors with Foodie."
        />
        <meta
          name="twitter:image"
          content="https://foodie-nine-gold.vercel.app/homepage.jpg"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <main className="relative w-full h-[87vh]">
        <Picture
          src="/homepage.webp"
          alt="Foodie – Discover Recipes, Food Blogs & Local Flavors"
          sizes="100vw"
          className="object-cover"
          fill={true}
          preload={true}
          fetchPriority="high"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 text-center space-y-4 w-full max-w-sm flex flex-col items-center justify-center">
            <Link
              href="/recipes"
              className="text-xl sm:text-2xl font-semibold hover:text-orange-600 transition"
            >
              Go to Recipes
            </Link>
            <Link
              href="/blogs"
              className="text-xl sm:text-2xl font-semibold hover:text-orange-600 transition"
            >
              Go to Blogs
            </Link>
          </div>
        </div>
        <script
          id="homepage-websiteSchema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </main>
    </>
  );
}

export default HomePage;
