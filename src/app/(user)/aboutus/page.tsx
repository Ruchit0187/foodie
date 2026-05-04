import { Metadata } from "next";
import Script from "next/script";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";
export const dynamic = "force-static";
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
      <div className="text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-green-500 text-white text-center py-20 px-4 min-h-[300px] flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About Foodie</h1>
          <p className="text-lg md:text-xl">
            Delivering happiness, one bite at a time
          </p>
        </section>

        {/* About Section */}
        <section className="p-5 max-w-6xl mx-auto min-h-75">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Foodie is a modern food delivery platform created for people who
              love delicious food and fast service. We connect you with local
              favorites and top-rated restaurants.
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is simple — make food ordering effortless, enjoyable,
              and reliable. From quick snacks to family meals, Foodie delivers
              happiness to your doorstep.
            </p>

            {/* Stats with fixed layout */}
            <div className="flex gap-8 flex-wrap">
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "500+", label: "Restaurants" },
                { value: "30 min", label: "Avg Delivery" },
              ].map((item, i) => (
                <div key={i} className="w-30">
                  <h3 className="text-2xl font-bold text-orange-500">
                    {item.value}
                  </h3>
                  <span className="text-sm text-gray-500 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16 px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose Foodie
          </h2>

          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Food",
                desc: "We partner with trusted restaurants to ensure quality meals.",
              },
              {
                title: "Fast Delivery",
                desc: "Quick and reliable delivery you can count on.",
              },
              {
                title: "Customer First",
                desc: "Your satisfaction is always our top priority.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow transition min-h-35 flex flex-col justify-start"
              >
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Script
        id="aboutPageSchema"
        async={true}
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <Script
        type="application/ld+json"
        async={true}
        id="breadcrumbSchema"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default Aboutus;
