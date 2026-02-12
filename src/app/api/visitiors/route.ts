import { headers } from "next/headers";

export async function GET() {
  const headersList =await headers();

  const ip =  headersList.get("x-forwarded-for")?.split(",")[0] || "Unknown";

  const country = headersList.get("x-vercel-ip-country") || "Unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "Unknown";
  const city = headersList.get("x-vercel-ip-city") || "Unknown";
  const continent = headersList.get("x-vercel-ip-continent") || "Unknown";

  return Response.json({
    ip,
    continent,
    country,
    region,
    city,
  });
}
