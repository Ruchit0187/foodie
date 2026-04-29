import { Metadata } from "next";
import Script from "next/script";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

export const metadata: Metadata = {
  title: "About Us | Our Mission to Deliver Happiness - Foodie",
  description:
    "Learn more about Foodie's journey, our commitment to quality, and our mission to connect you with the best local food and fast service.",
  keywords: [
    "about foodie",
    "our mission",
    "food delivery story",
    "reliable food platform",
    "quality restaurants",
    "customer-centric food service",
    "fast delivery mission",
    "foodie team",
    "food community about",
    "who is foodie",
  ],
  openGraph: {
    title: "About Foodie – Our Mission to Deliver Happiness",
    description:
      "Learn about Foodie's journey, our commitment to quality food, and our mission to connect you with the best local restaurants.",
    type: "website",
    images: [{ url: "/homepage.jpg", alt: "About Foodie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Foodie – Our Mission to Deliver Happiness",
    description:
      "Learn about Foodie's journey and our commitment to quality food.",
    images: ["/homepage.jpg"],
  },
  alternates: {
    canonical: `${BASE_URL}/aboutus`,
  },
};

async function Aboutus() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Foodie",
    url: `${BASE_URL}/aboutus`,
    description:
      "Learn more about Foodie's journey, our commitment to quality, and our mission to connect you with the best local food.",
    mainEntity: {
      "@type": "Organization",
      name: "Foodie",
      url: BASE_URL,
      logo: `${BASE_URL}/foodielogo.png`,
      description:
        "Foodie is a modern food delivery platform created for people who love delicious food and fast service. We connect you with local favorites and top-rated restaurants.",
      foundingDate: "2024",
      slogan: "Delivering happiness, one bite at a time",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${BASE_URL}/aboutus`,
      },
    ],
  };

  return (
    <>
      <Script
        strategy="lazyOnload"
        id="aboutPageSchema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
   
      <Script
        strategy="lazyOnload"
        type="application/ld+json"
        id="breadcrumbSchema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="text-gray-800">
        <section className="bg-linear-to-r from-orange-500 to-green-500 text-white text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About Foodie</h1>
          <p className="text-lg md:text-xl">
            Delivering happiness, one bite at a time
          </p>
        </section>
        <section className="p-5">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Foodie is a modern food delivery platform created for people who
              love delicious food and fast service. We connect you with local
              favorites and top-rated restaurants.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is simple — make food ordering effortless, enjoyable,
              and reliable. From quick snacks to family meals, Foodie delivers
              happiness to your doorstep.
            </p>
            <div className="flex gap-8">
              <div>
                <h3 className="text-2xl font-bold text-orange-500">10K+</h3>
                <span className="text-sm text-gray-500">Happy Customers</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-500">500+</h3>
                <span className="text-sm text-gray-500">Restaurants</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-500">30 min</h3>
                <span className="text-sm text-gray-500">Avg Delivery</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose Foodie
          </h2>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">
                We partner with trusted restaurants to ensure quality meals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2"> Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery you can count on.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2"> Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is always our top priority.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Aboutus;
