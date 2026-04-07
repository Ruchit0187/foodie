import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/admin",         // Admin dashboard & pages
          "/admin/",
          "/api/",          // All API routes
          "/signin",        // Auth pages
          "/signup",
          "/forgot",
          "/resetpassword",
          "/emailverify",
          "/error",
          "/profile",       // User profile (protected)
          "/profile/",
        ],
        allow: [
          "/",              // Home page
          "/aboutus",       // About us
          "/blogs",         // Blogs listing
          "/blogs/",        // Individual blog pages
          "/recipes",       // Recipes listing
          "/recipes/",      // Individual recipe pages
        ],
      },
    ],
    sitemap: `${BASE_URL}sitemap.xml`,
  };
}
