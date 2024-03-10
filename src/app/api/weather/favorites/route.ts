import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const searchParams = request.nextUrl.searchParams;
  const cityCodes = searchParams.get("city_codes");

  if (!apiKey) {
    return Response.json(
      { message: "OpenWeather API key missing." },
      { status: 401 }
    );
  }

  if (!cityCodes) {
    return Response.json({ message: "City codes missing." }, { status: 400 });
  }

  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/group?id=${cityCodes}&appid=${apiKey}`,
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
