import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const countryCode = searchParams.get("country_code");

  if (!apiKey) {
    return Response.json(
      { message: "OpenWeather API key missing." },
      { status: 401 }
    );
  }

  if (!city || !countryCode) {
    return Response.json(
      { message: "City or country code missing." },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`,
    {
      // Revalidate every 60 seconds
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();

  return Response.json(data);
}
