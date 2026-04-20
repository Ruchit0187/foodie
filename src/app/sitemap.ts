import { MetadataRoute } from "next";
import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { Recipes } from "@/src/model/recipeSchema";

const BASE_URL =  "https://foodie-nine-gold.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ─── Static Pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/aboutus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // ─── Dynamic Blog Pages ───────────────────────────────────────
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    await dbConnect();
    const blogs = await Blogs.find({}, { _id: 1, date: 1 }).lean();
    blogPages = blogs.map((blog) => ({
      url: `${BASE_URL}/blogs/${blog._id}`,
      lastModified: blog.date || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch blogs", error);
  }

  // ─── Dynamic Recipe Pages ─────────────────────────────────────
  let recipePages: MetadataRoute.Sitemap = [];
  try {
    const recipes = await Recipes.find({}, { _id: 1 }).lean();
    recipePages = recipes.map((recipe) => ({
      url: `${BASE_URL}/recipes/${recipe._id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch recipes", error);
  }

  return [...staticPages, ...blogPages, ...recipePages];
}
