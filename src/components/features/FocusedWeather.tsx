"use client";

import {
  DEFAULT_FAVORITE_CITIES,
  useFavoriteCitiesStore,
} from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DayTime from "../shared/DayTime";
import WeekForecast from "./WeekForecast";
import CurrentForecast from "./CurrentForecast";
import FavoriteButton from "../shared/FavoriteButton";
import { useEffect } from "react";
import { fetchCityWeather } from "@/lib/utils";

export default function FocusedWeather() {
  const { cityWeather, setCityWeatherData } = useFocusedWeatherState();
  const { isLoading: isFavoriteCitiesLoading, favoriteCitiesWeather } =
    useFavoriteCitiesStore();

  const fetchAndSetCityWeather = async (
    lat: number,
    lng: number,
    cityName: string,
    countryShortName: string
  ) => {
    const data = await fetchCityWeather(lat, lng);
    setCityWeatherData({ ...data, cityName, countryShortName });
  };

  useEffect(() => {
    // If favorite cities are still loading, return.
    if (isFavoriteCitiesLoading) return;
    if (!cityWeather) {
      // If there is no focused city, set the first favorite city as focused.
      if (favoriteCitiesWeather[0]) {
        setCityWeatherData(favoriteCitiesWeather[0]);
      } else {
        // If there are no favorite cities, set the default city as focused.
        fetchAndSetCityWeather(
          DEFAULT_FAVORITE_CITIES[0].lat,
          DEFAULT_FAVORITE_CITIES[0].lon,
          DEFAULT_FAVORITE_CITIES[0].cityName,
          DEFAULT_FAVORITE_CITIES[0].countryShortName
        );
      }
    }
  }, [favoriteCitiesWeather, isFavoriteCitiesLoading]);

  return (
    <Card className="cursor-pointer w-full h-full cursor-default">
      {cityWeather && (
        <>
          <CardHeader className="pb-0 pt-3">
            <CardTitle className="flex justify-between items-center text-5xl">
              {cityWeather?.cityName}, {cityWeather?.countryShortName}
              <FavoriteButton />
            </CardTitle>
            <CardDescription className="text-2xl">
              {/* TODO: Show Loading, if time is not set. */}
              {cityWeather && <DayTime timezone={cityWeather.timezone} />}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2 flex flex-col justify-center">
            <CurrentForecast currentForecast={cityWeather?.current} />
            <WeekForecast
              weekForecastData={cityWeather?.daily || []}
              timezone={cityWeather?.timezone}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
}
