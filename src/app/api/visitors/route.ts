import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const ip = request.headers.get("x-forwarded-for");
  console.log(request.headers.get("x-vercel-ip-country"));
  // const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "Unknown";

  const country = headersList.get("x-vercel-ip-country") || "Unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "Unknown";
  const city = headersList.get("x-vercel-ip-city") || "Unknown";
  const continent = headersList.get("x-vercel-ip-continent") || "Unknown";
  // console.log(headersList);
  return NextResponse.json({
    ip,
    continent,
    country,
    region,
    city,
  });
}
