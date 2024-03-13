import { FavoriteCity } from "@/stores/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getWeekday(datetime: number, timezone: string) {
  return new Date(datetime).toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "long",
  });
}

export function getTime(datetime: number, timezone: string) {
  return new Date(datetime).toLocaleTimeString("en-US", {
    timeZone: timezone,
  });
}

export function roundTemperature(temp: number) {
  return Math.round(temp);
}

export function getTemperatureByUnit(temp: number, unit: string) {
  if (unit === "metric") {
    return `${roundTemperature(temp)}°C`;
  }
  const imperalTemp = (temp * 9) / 5 + 32;
  return `${roundTemperature(imperalTemp)}°F`;
}

export function getCityCountryCode(cityName: string, countryShortName: string) {
  return `${cityName}-${countryShortName}`;
}

export async function fetchCityWeather(lat: number, lng: number) {
  const response = await fetch(`/api/weather/search?lat=${lat}&lon=${lng}`);
  return response.json();
}

export async function fetchFavoriteCitiesWeather(
  favoriteCities: FavoriteCity[]
) {
  const favoriteCityWeatherPromises = favoriteCities.map((favoriteCity) => {
    return fetchCityWeather(favoriteCity.lat, favoriteCity.lon);
  });

  const results = await Promise.all(favoriteCityWeatherPromises);

  return results.map((result, index) => {
    return {
      ...result,
      cityName: favoriteCities[index].cityName,
      countryShortName: favoriteCities[index].countryShortName,
    };
  });
}
