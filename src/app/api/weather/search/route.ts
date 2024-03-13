import { type NextRequest } from "next/server";

enum ExcludeTypes {
  CURRENT = "current",
  MINUTELY = "minutely",
  HOURLY = "hourly",
  DAILY = "daily",
  ALERTS = "alerts",
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!apiKey) {
    return Response.json(
      { message: "OpenWeather API key missing." },
      { status: 401 }
    );
  }

  if (!lat || !lon) {
    return Response.json(
      { message: "Latitude and/or Longitude missing." },
      { status: 400 }
    );
  }

  const defaultExclude = [
    ExcludeTypes.MINUTELY,
    ExcludeTypes.HOURLY,
    ExcludeTypes.ALERTS,
  ];

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${defaultExclude}&units=metric&appid=${apiKey}`,
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
