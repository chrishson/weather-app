import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { MdFavorite } from "react-icons/md";
import WeatherIcon from "../ui/WeatherIcon";
import DayTime from "./DayTime";
import { CityWeather } from "@/stores/types";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { roundTemperature } from "@/lib/utils";

type FavoriteCityCardProps = {
  cityWeather: CityWeather;
};

export default function FavoriteCityCard({
  cityWeather,
}: FavoriteCityCardProps) {
  const { removeFavoriteCity } = useFavoriteCitiesStore();
  const { setCityWeatherData } = useFocusedWeatherState();

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
      <CardHeader className="pb-0 pt-4">
        <CardTitle className="flex justify-between items-center">
          {cityWeather.cityName}, {cityWeather.countryShortName}
          {/* TODO: On Hover change to full icon. Also should be full if already favorited */}
          <button
            className="cursor-pointer"
            onClick={handleRemoveFavoriteCityClick}
          >
            <MdFavorite size={24} />
          </button>
        </CardTitle>
        <CardDescription>
          {/* TODO: Show Loading, if time is not set. */}
          <DayTime timezone={cityWeather.timezone} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-1">
        <div className="flex justify-between items-center">
          <WeatherIcon
            weatherCode={cityWeather.current?.weather[0].id}
            className="h-20 w-20"
          />
          <div className="text-right">
            <p>{roundTemperature(cityWeather.current?.temp)}°C</p>
            <p>{cityWeather.current?.weather[0].description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
