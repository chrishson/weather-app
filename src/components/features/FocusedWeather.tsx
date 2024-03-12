"use client";

import { getWeekday } from "@/lib/utils";
import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { Weather } from "@/stores/types";
import { MdFavoriteBorder } from "react-icons/md";
import WeekdayCard from "../shared/WeekdayCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/Card";
import WeatherIcon from "../core/WeatherIcon";
import DayTime from "../shared/DayTime";

export default function FocusedWeather() {
  const { cityWeather } = useFocusedWeatherState();
  const { addFavoriteCity } = useFavoriteCitiesStore();

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
    <div className="flex min-w-full">
      <Card className="cursor-pointer">
        <CardHeader className="pb-0">
          <CardTitle className="flex justify-between items-center">
            {cityWeather?.cityName}, {cityWeather?.countryShortName}
            {/* TODO: On Hover change to full icon. Also should be full if already favorited and vice versa*/}
            <button className="cursor-pointer" onClick={handleClick}>
              <MdFavoriteBorder size={24} />
            </button>
          </CardTitle>
          <CardDescription>
            {/* TODO: Show Loading, if time is not set. */}
            {cityWeather && <DayTime timezone={cityWeather.timezone} />}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex">
          <div className="flex flex-col justify-between items-center">
            <WeatherIcon
              weatherCode={cityWeather?.current?.weather[0].id}
              className="h-20 w-20"
            />
            <div className="text-right">
              <p>{cityWeather?.current?.temp}°C</p>
              <p>{cityWeather?.current?.weather[0].description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Detailed Current Section. Should be own section. */}
      <div className="flex">
        {cityWeather?.daily?.map((dailyWeather: Weather, index) => {
          const weekday = getWeekday(
            dailyWeather.dt * 1000,
            cityWeather.timezone
          );
          // TODO: Need better index
          return (
            <WeekdayCard
              dailyWeather={dailyWeather}
              weekday={weekday}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
