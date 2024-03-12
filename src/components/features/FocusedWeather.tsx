"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { MdFavoriteBorder } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DayTime from "../shared/DayTime";
import WeekForecast from "./WeekForecast";
import CurrentForecast from "./CurrentForecast";

export default function FocusedWeather() {
  const { cityWeather } = useFocusedWeatherState();
  const { favoriteCitiesWeather, addFavoriteCity } = useFavoriteCitiesStore();

  // TODO: If Not Favorite Cities, need default.
  const focusedWeather = cityWeather ? cityWeather : favoriteCitiesWeather[0];

  const handleClick = () => {
    if (!cityWeather) return;
    addFavoriteCity(
      cityWeather.cityName,
      cityWeather.countryShortName,
      cityWeather.lat,
      cityWeather.lon
    );
  };

  return (
    <div className="flex-grow">
      <Card className="cursor-pointer w-full h-full">
        <CardHeader className="pb-0 pt-3">
          <CardTitle className="flex justify-between items-center text-5xl">
            {focusedWeather?.cityName}, {focusedWeather?.countryShortName}
            {/* TODO: On Hover change to full icon. Also should be full if already favorited and vice versa*/}
            <button className="cursor-pointer" onClick={handleClick}>
              <MdFavoriteBorder size={48} />
            </button>
          </CardTitle>
          <CardDescription className="text-2xl">
            {/* TODO: Show Loading, if time is not set. */}
            {focusedWeather && <DayTime timezone={focusedWeather.timezone} />}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex flex-col justify-center">
          <CurrentForecast currentForecast={focusedWeather?.current} />
          <WeekForecast
            weekForecastData={focusedWeather?.daily || []}
            timezone={focusedWeather?.timezone}
          />
        </CardContent>
      </Card>
    </div>
  );
}
