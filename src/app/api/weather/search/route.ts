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
  const type = searchParams.get("type");

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

  // TODO: Make units configurable
  const defaultUnit = "metric";

  const defaultExclude = [
    ExcludeTypes.MINUTELY,
    ExcludeTypes.HOURLY,
    ExcludeTypes.ALERTS,
    // Exclude daily weather data if type is "current"
    type === "current" ? ExcludeTypes.DAILY : "",
  ];

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${defaultExclude}&units=${defaultUnit}&appid=${apiKey}`,
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
