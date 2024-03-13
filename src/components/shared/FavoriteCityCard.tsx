import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import WeatherIcon from "../ui/WeatherIcon";
import DayTime from "./DayTime";
import { CityWeather } from "@/stores/types";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { getTemperatureByUnit } from "@/lib/utils";
import { useTemperatureUnitStore } from "@/stores/temperatureUnitStore";
import FavoriteButton from "./FavoriteButton";

type FavoriteCityCardProps = {
  cityWeather: CityWeather;
};

export default function FavoriteCityCard({
  cityWeather,
}: FavoriteCityCardProps) {
  useFavoriteCitiesStore();
  const { setCityWeatherData } = useFocusedWeatherState();

  const { temperatureUnit } = useTemperatureUnitStore();
  const temp = getTemperatureByUnit(cityWeather.current.temp, temperatureUnit);

  const handleCardClick = () => {
    setCityWeatherData(cityWeather);
  };

  return (
    <Card
      className="min-w-[280px] cursor-pointer hover:bg-accent dark:hover"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-0 pt-4 flex-row justify-between">
        <div>
          <CardTitle className="flex justify-between items-center">
            {cityWeather.cityName}, {cityWeather.countryShortName}
          </CardTitle>
          <CardDescription className="pt-1">
            <DayTime timezone={cityWeather.timezone} />
          </CardDescription>
        </div>
        <FavoriteButton cityWeather={cityWeather} />
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center">
          <WeatherIcon
            weatherCode={cityWeather.current?.weather[0].id}
            className="h-20 w-20"
          />
          <div className="text-right">
            <p>{temp}</p>
            <p>{cityWeather.current?.weather[0].description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
