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
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";

type FavoriteCityCardProps = {
  cityWeather: CityWeather;
};

// TODO: Util Lib
const getWeekday = (datetime: number, timezone: string) => {
  return new Date(datetime).toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "long",
  });
};

export default function FavoriteCityCard({
  cityWeather,
}: FavoriteCityCardProps) {
  const { removeFavoriteCity } = useFavoriteCitiesStore();
  const { setCityWeatherData } = useFocusedWeatherState();

  const weekday = getWeekday(
    cityWeather.current?.dt || 0 * 1000,
    cityWeather.timezone
  );

  const handleCardClick = () => {
    setCityWeatherData(cityWeather);
  };

  const handleRemoveFavoriteCityClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    removeFavoriteCity(cityWeather.cityName, cityWeather.countryShortName);
  };

  return (
    <Card className="min-w-[280px] cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-0">
        <CardTitle className="flex justify-between items-center">
          {cityWeather.cityName}, {cityWeather.countryShortName}
          <button
            className="cursor-pointer"
            onClick={handleRemoveFavoriteCityClick}
          >
            <MdFavorite size={24} />
          </button>
        </CardTitle>
        <CardDescription>
          {/* TODO: Show Loading, if time is not set. */}
          {weekday}, <Time timezone={cityWeather.timezone} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <WeatherIcon
            weatherCode={cityWeather.current?.weather[0].id}
            className="h-20 w-20"
          />
          <div className="text-right">
            <p>{cityWeather.current?.temp}°C</p>
            <p>{cityWeather.current?.weather[0].description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
