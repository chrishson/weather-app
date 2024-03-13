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
import LoadingSpinner from "../ui/LoadingSpinner";

export default function FocusedWeather() {
  const {
    isLoading: isFocusedWeatherLoading,
    cityWeather,
    setCityWeatherData,
    setLoadingState,
  } = useFocusedWeatherState();
  const { isLoading: isFavoriteCitiesLoading, favoriteCitiesWeather } =
    useFavoriteCitiesStore();

  const fetchAndSetCityWeather = async (
    lat: number,
    lng: number,
    cityName: string,
    countryShortName: string
  ) => {
    setLoadingState(true);
    const data = await fetchCityWeather(lat, lng);
    setCityWeatherData({ ...data, cityName, countryShortName });
    setLoadingState(false);
  };

  useEffect(() => {
    // If loading, do nothing;
    if (!isFavoriteCitiesLoading && !isFocusedWeatherLoading && !cityWeather) {
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
  }, [favoriteCitiesWeather, isFavoriteCitiesLoading, isFocusedWeatherLoading]);

  return (
    <Card className="cursor-pointer w-full h-full cursor-default">
      {!isFocusedWeatherLoading && cityWeather ? (
        <>
          <CardHeader className="pb-0 pt-3">
            <CardTitle className="flex justify-between items-center text-3xl sm:text-5xl pb-1">
              {cityWeather?.cityName}, {cityWeather?.countryShortName}
              <FavoriteButton cityWeather={cityWeather} />
            </CardTitle>
            <CardDescription className="text-xl sm:text-2xl">
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
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </Card>
  );
}
