import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/Card";
import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { MdFavorite } from "react-icons/md";
import WeatherIcon from "../core/WeatherIcon";
import Time from "./Time";
import { CityWeather } from "@/stores/types";

type FavoriteCityCardProps = {
  city: CityWeather;
};

// TODO: Util Lib
const getWeekday = (datetime: number, timezone: string) => {
  return new Date(datetime).toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "long",
  });
};

export default function FavoriteCityCard({ city }: FavoriteCityCardProps) {
  const { removeFavoriteCity } = useFavoriteCitiesStore();
  const weekday = getWeekday(city.current?.dt || 0 * 1000, city.timezone);
  return (
    <Card className="min-w-[280px]">
      <CardHeader className="pb-0">
        <CardTitle className="flex justify-between items-center">
          {city.cityName}, {city.countryShortName}
          <button
            className="cursor-pointer"
            onClick={() =>
              removeFavoriteCity(city.cityName, city.countryShortName)
            }
          >
            <MdFavorite size={24} />
          </button>
        </CardTitle>
        <CardDescription>
          {/* TODO: Show Loading, if time is not set. */}
          {weekday}, <Time timezone={city.timezone} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <WeatherIcon
            weatherCode={city.current?.weather[0].id}
            className="h-20 w-20"
          />
          <div className="text-right">
            <p>{city.current?.temp}°C</p>
            <p>{city.current?.weather[0].description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
