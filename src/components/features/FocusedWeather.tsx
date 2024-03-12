"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
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

export default function FocusedWeather() {
  const { cityWeather, setCityWeatherData } = useFocusedWeatherState();
  const { favoriteCitiesWeather } = useFavoriteCitiesStore();

  useEffect(() => {
    if (!cityWeather && favoriteCitiesWeather[0]) {
      setCityWeatherData(favoriteCitiesWeather[0]);
    }
  }, [favoriteCitiesWeather]);

  return (
    <div className="flex-grow">
      <Card className="cursor-pointer w-full h-full">
        {cityWeather && (
          <>
            <CardHeader className="pb-0 pt-3">
              <CardTitle className="flex justify-between items-center text-5xl">
                {cityWeather?.cityName}, {cityWeather?.countryShortName}
                <FavoriteButton size={48} />
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
    </div>
  );
}
