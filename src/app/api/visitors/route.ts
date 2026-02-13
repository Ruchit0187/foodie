import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "Unknown";
  const country = headersList.get("x-vercel-ip-country") || "Unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "Unknown";
  const city = headersList.get("x-vercel-ip-city") || "Unknown";
  const continent = headersList.get("x-vercel-ip-continent") || "Unknown";
  return NextResponse.json({
    ip,
    continent,
    country,
    region,
    city,
  });
}
