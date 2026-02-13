import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const countryName = {
  "AF": "Afghanistan",
  "AL": "Albania",
  "DZ": "Algeria",
  "AR": "Argentina",
  "AU": "Australia",
  "AT": "Austria",
  "BD": "Bangladesh",
  "BE": "Belgium",
  "BR": "Brazil",
  "CA": "Canada",
  "CN": "China",
  "DK": "Denmark",
  "EG": "Egypt",
  "FI": "Finland",
  "FR": "France",
  "DE": "Germany",
  "GR": "Greece",
  "HK": "Hong Kong",
  "IN": "India",
  "ID": "Indonesia",
  "IE": "Ireland",
  "IL": "Israel",
  "IT": "Italy",
  "JP": "Japan",
  "KE": "Kenya",
  "MY": "Malaysia",
  "MX": "Mexico",
  "NL": "Netherlands",
  "NZ": "New Zealand",
  "NG": "Nigeria",
  "NO": "Norway",
  "PK": "Pakistan",
  "PH": "Philippines",
  "PL": "Poland",
  "PT": "Portugal",
  "RU": "Russia",
  "SA": "Saudi Arabia",
  "SG": "Singapore",
  "ZA": "South Africa",
  "KR": "South Korea",
  "ES": "Spain",
  "SE": "Sweden",
  "CH": "Switzerland",
  "TH": "Thailand",
  "TR": "Turkey",
  "AE": "United Arab Emirates",
  "GB": "United Kingdom",
  "US": "United States",
  "VN": "Vietnam"
}


export async function GET() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "Unknown";
  const countryCode = headersList.get("x-vercel-ip-country") || "Unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "Unknown";
  const city = headersList.get("x-vercel-ip-city") || "Unknown";
  const continent = headersList.get("x-vercel-ip-continent") || "Unknown";
  const country=countryName?.country;
  return NextResponse.json({
    ip,
    continent,
    country,
    region,
    city,
  });
}
